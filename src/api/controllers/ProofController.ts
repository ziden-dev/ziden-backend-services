import { Request, Response } from 'express';
import axios from 'axios';

import { KYCQueryMTPInput, KYCNonRevQueryMTPInput, KYCQuerySigInput, KYCNonRevQuerySigInput } from "@zidendev/zidenjs";
import { IQuery } from "../models/Service.js";
import { IssuerService } from "../services/IssuerService.js";
import { ProofService } from "../services/ProofService.js";
import { ServiceService } from '../services/ServiceService.js';
import { BadRequestError } from '../errors/http/BadRequestError.js';
import { NotFoundError } from '../errors/http/NotFoundError.js';
import { sendRes } from '../responses/index.js';
import logger from '../../lib/logger/index.js';

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
    nonRevSigInput?: KYCNonRevQuerySigInput
}

export interface Proof {
    proof: any,
    publicData: any
}

export class ProofController {

    serviceService: ServiceService;
    issuerService: IssuerService;
    proofService: ProofService;

    constructor() {
        this.serviceService = new ServiceService();
        this.issuerService = new IssuerService();
        this.proofService = new ProofService();
        
        this.generateProofRequest = this.generateProofRequest.bind(this);
        this.fetchProofRequest = this.fetchProofRequest.bind(this);
        this.submitProofs = this.submitProofs.bind(this);
        this.verifyProofs = this.verifyProofs.bind(this);
    }

    public async generateProofRequest(req: Request, res: Response){
        try {
            if (!req.body.serviceId) throw new BadRequestError('Missing serviceId in request body');
            const request = {
                serviceId: req.body.serviceId,
                message: 'Sign this message to provide proof'
            }
            const newRequest = await this.proofService.generateProofRequest(request);
            sendRes(res, null, {
                'request': {
                    'requestId': newRequest._id,
                    'serviceId': newRequest.serviceId,
                    'message': newRequest.message,
                    'validUntil': newRequest.validUntil ?? ''
                }
            });

        } catch (error: any) {
            logger.error(error);
            sendRes(res, error);
        }
    }

    public async fetchProofRequest(req: Request, res: Response) {
        try {
            if(!req.params.requestId) throw new BadRequestError('Missing requestId in request params');
            const request = await this.proofService.findProofRequest(req.params.requestId);
            if (request === undefined) throw new NotFoundError('Request does not existed');
            sendRes(res, null, {
                'request': {
                    'requestId': request._id,
                    'serviceId': request.serviceId,
                    'message': request.message,
                    'validUntil': request.validUntil ?? '',
                    'zkProofs': request.proofs || []
                }
            });
        } catch (error: any) {
            logger.error(error);
            sendRes(res, error);
        }
    }

    public async submitProofs(req: Request, res: Response) {
        try {
            if (!req.body.requestId) throw new BadRequestError('Missing requestId in request param');
            if (!req.body.zkProofs) throw new BadRequestError('Missing zkProofs in request param');

            const request = await this.proofService.findProofRequest(req.body.requestId);
            if (request === undefined) throw new NotFoundError('Request does not exist');
            const service = await this.serviceService.findOneById(request.serviceId);
            if (service === undefined) throw new NotFoundError('Service does not exist');

            const verifications = await Promise.all(req.body.zkProofs.map((proof: Proof) => {
                return this.proofService.verifyZkProof(Number(service.networkId), proof);
            }));

            await this.proofService.saveProof(req.body.requestId, req.body.zkProofs);

            sendRes(res, null, {
                'isValid': !verifications.includes(false),
                'results': verifications
            });
        } catch (error: any) {
            logger.error(error)
            sendRes(res, error);
        }
    }

    public async verifyProofs(req: Request, res: Response) {
        try {
            if (!req.body.networkId) throw new BadRequestError('Missing networkId in request param');
            if (!req.body.zkProofs) throw new BadRequestError('Missing zkProofs in request body');
            const verifications = await Promise.all(req.body.zkProofs.map((proof: Proof) => {
                return this.proofService.verifyZkProof(Number(req.body.networkId), proof);
            }));

            sendRes(res, null, {
                'isValid': !verifications.includes(false),
                'results': verifications
            });
        } catch (error: any) {
            logger.error(error)
            sendRes(res, error);
        }
    }
}