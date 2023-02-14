import * as ethers from 'ethers';
import { v4 as uuid } from 'uuid';

import ProofRequest, { IProof, IProofRequest } from '../models/ProofRequest.js';
import { BadRequestError } from '../errors/http/BadRequestError.js';
import { useQueryMtpValidator } from '../../lib/networks/evm/index.js';
import env from '../../lib/env/index.js';

function p256(n: any) {
    let nstr = Buffer.from(n, 'utf-8').toString();
    while (nstr.length < 64) nstr = "0"+nstr;
    return ethers.BigNumber.from(nstr);
}

export class ProofService {

    constructor(){}

    public async generateProofRequest(proofRequest: IProofRequest): Promise<IProofRequest> {
        let request = await ProofRequest.findById(proofRequest._id ?? '');
        if (request === null) {
            const newRequest = await ProofRequest.create({
                _id: uuid(),
                serviceId: proofRequest.serviceId,
                message: proofRequest.message+`\nNonce: ${uuid()}`,
                proofs: [],
                validUntil: new Date(Number(new Date()) + env.zkProof.validTime)
            });
            return newRequest;
        } else {
            request.validUntil = new Date(Number(new Date()) + env.zkProof.validTime);

            return (await ProofRequest.findByIdAndUpdate(
                request._id,
                request,
                {upsert: true, new: true}
            ));
        }
    }

    public async findProofRequest(requestId: string): Promise<IProofRequest | undefined> {
        return await ProofRequest.findById(requestId) ?? undefined;
    }

    public async saveProof(requestId: string, proofs: IProof[]): Promise<any> {
        let request = await ProofRequest.findById(requestId ?? '');
        if (request === null || (Number(new Date((request.validUntil??'').toString())) <= Number(new Date()))) {
            throw new BadRequestError('Request is expired, please generate new request');
        }
        request.proofs = proofs;
        
        return (await ProofRequest.findByIdAndUpdate(
            request._id,
            request,
            {upsert: true, new: true}
        ));
    }

    public async verifyZkProof(networkId: number, zkProof: IProof): Promise<any> {
        const { proof, publicData } = zkProof;
        
        const queryMTP = useQueryMtpValidator(networkId);
        if (queryMTP === undefined) throw 'Network is not supported';

        const input = publicData[6];
        console.log(BigInt(input).toString(2).padStart(198, "0"));
        const queryCompactInput = BigInt("0b" + BigInt(input).toString(2).padStart(198, "0").slice(64, 198)).toString();
        console.log(queryCompactInput)

        const circuitQuery = {
            deterministicValue: publicData[7],
            compactInput: queryCompactInput,
            mask: publicData[8],
            circuitId: 'credentialAtomicQuery'
        }
        
        const callData = {
            a: [p256(proof.pi_a[0]), p256(proof.pi_a[1])],
            b: [[p256(proof.pi_b[0][1]), p256(proof.pi_b[0][0])], [p256(proof.pi_b[1][1]), p256(proof.pi_b[1][0])]],
            c: [p256(proof.pi_c[0]), p256(proof.pi_c[1])],
            inputs: publicData.map((e: any) => p256(e))
        };

        return await queryMTP.verify(
            callData.a,
            callData.b,
            callData.c,
            callData.inputs,
            circuitQuery
        );
    }

}