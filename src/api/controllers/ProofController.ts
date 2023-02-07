import { Request, Response } from 'express';
import axios from 'axios';

import { KYCQueryMTPInput, KYCNonRevQueryMTPInput } from "zidenjs/build/witnesses/queryMTP.js";
import { KYCQuerySigInput, KYCQuerySigNonRevInput } from "zidenjs/build/witnesses/querySig.js";
import { IQuery } from "../models/Service.js";
import { RegistryService } from "../services/RegistryService.js";
import { IssuerService } from "../services/IssuerService.js";
import { ProofService } from "../services/ProofService.js";
import { BadRequestError } from '../errors/http/BadRequestError.js';
import { NotFoundError } from '../errors/http/NotFoundError.js';

export interface ProofRequest {
    verifierId: string,
    message: string,
    requirements: {
        schemaHash: string,
        circuitId: string,
        query: IQuery
    }[]
}

export interface ProofData {
    mtpInput?: KYCQueryMTPInput,
    nonRevMtpInput?: KYCNonRevQueryMTPInput
    sigInput?: KYCQuerySigInput,
    nonRevSigInput?: KYCQuerySigNonRevInput
}

export interface Proof {
    proof: any,
    publicData: any
}

export class ProofController {

    registryService: RegistryService;
    issuerService: IssuerService;
    proofService: ProofService;

    constructor() {
        this.registryService = new RegistryService();
        this.issuerService = new IssuerService();
        this.proofService = new ProofService();
        
        // this.getProofRequest = this.getProofRequest.bind(this);
        // this.getProofPublicData = this.getProofPublicData.bind(this);
        // this.submitProofs = this.submitProofs.bind(this);
    }

    // public async getProofRequest(req: Request, res: Response){
    //     try {
    //         if (!req.params.serviceId) throw new BadRequestError('Missing serviceId in request param');
    //         const service = await this.registryService.findOneService(req.params.serviceId);
    //         if (service === undefined) throw new NotFoundError('Service does not exist');
    //         res.send({
    //             'request': {
    //                 verifierId: service.verifierId,
    //                 message: 'Sign this message to access Ziden service',
    //                 requirements: service.requirements.map((req) => {
    //                     return {
    //                         schemaHash: req.schemaHash,
    //                         circuitId: req.circuitId,
    //                         query: req.query
    //                     }
    //                 })
    //             }
    //         });

    //     } catch (error: any) {
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async getProofPublicData(req: Request, res: Response) {
    //     try {
    //         if (!req.query.issuerId) throw new BadRequestError('Missing issuerId in request param');
    //         if (!req.query.claimId) throw new BadRequestError('Missing claimId in request param');

    //         const issuer = await this.issuerService.findOne(req.params.issuerId);
    //         if(issuer === undefined) throw new NotFoundError();

    //         res.send({
    //             'public': (await axios.get(`${issuer.endpointUrl}/claims/${req.params.claimId}/proof`, {params: {type: 'nonRevMtp'}})).data
    //         }) 
    //     } catch (error: any) {
    //         res.status(error.httpCode ?? 500).send(error);
    //     } 
    // }

    // public async submitProofs(req: Request, res: Response) {
    //     try {
    //         if (!req.body.zkProofs) throw new BadRequestError('Missing zkProofs in request param');
    //         const verifications = req.body.zkProofs.map((p: Proof) => {
    //             if (!p.proof || !p.publicData) throw new BadRequestError();
    //             return this.proofService.verifyProof(p.proof, p.publicData);
    //         })

    //         res.send({
    //             'results': await Promise.all(verifications)
    //         });
    //     } catch (error: any) {
    //         console.error(error)
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

}