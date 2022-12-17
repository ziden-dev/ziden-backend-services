import * as ethers from 'ethers';

import abi from '../../static/abi.js';

function p256(n: any) {
    let nstr = Buffer.from(n, 'utf-8').toString();
    while (nstr.length < 64) nstr = "0"+nstr;
    return ethers.BigNumber.from(nstr);
}

export class ProofService {

    constructor(){}

    public async verifyProof(proof: any, publicSignals: any): Promise<any> {
        
        const address = "0x536B473Ee5490AbCF0064C4ce3D96Eb31Bd5a5BC";
        const jsonProviderUrl: string = "https://data-seed-prebsc-1-s1.binance.org:8545/";
        
        let queryMTP = new ethers.Contract(
            address,
            abi.queryMtp.interface,
            new ethers.providers['JsonRpcProvider'](jsonProviderUrl)
        );

        const circuitQuery = {
            deterministicValue: publicSignals[6],
            compactInput: publicSignals[7],
            mask: publicSignals[8],
            circuitId: 'credentialAtomicQuery'
        }
        
        const callData = {
            a: [p256(proof.pi_a[0]), p256(proof.pi_a[1])],
            b: [[p256(proof.pi_b[0][1]), p256(proof.pi_b[0][0])], [p256(proof.pi_b[1][1]), p256(proof.pi_b[1][0])]],
            c: [p256(proof.pi_c[0]), p256(proof.pi_c[1])],
            inputs: publicSignals.map((e: any) => p256(e))
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