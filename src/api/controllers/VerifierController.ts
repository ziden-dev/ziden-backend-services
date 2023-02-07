import axios from "axios";
import { Request, Response } from "express";

import { VerifierService } from "../services/VerifierService.js";
import { OperatorService } from "../services/OperatorService.js";
import { NetworkService } from "../services/NetworkService.js";
import { IVerifier } from "../models/Verifier.js";
import { IService } from "../models/Service.js";
import { NotFoundError } from "../errors/http/NotFoundError.js";
import { BadRequestError } from "../errors/http/BadRequestError.js";
import logger from "../../lib/logger/index.js";
import env from "../../lib/env/index.js";

export class VerifierController {

    verifierService: VerifierService;
    operatorService: OperatorService;
    networkService: NetworkService;
    
    constructor() {
        this.verifierService = new VerifierService();
        this.operatorService = new OperatorService();
        this.networkService = new NetworkService();

        this.createVerifier = this.createVerifier.bind(this);
        this.findVerifiers = this.findVerifiers.bind(this);
        // this.findOneVerifier = this.findOneVerifier.bind(this);
        // this.getVerifierProfile = this.getVerifierProfile.bind(this);
        // this.updateVerifierProfile = this.updateVerifierProfile.bind(this);
        // this.findVerifierServices = this.findVerifierServices.bind(this);
        // this.findVerifierOperators = this.findVerifierOperators.bind(this);
        // this.addOperator = this.addOperator.bind(this);
        // this.removeOperator = this.removeOperator.bind(this);
        // this.registration = this.registration.bind(this);
    }

    public async createVerifier(req: Request, res: Response) {
        try {
            if (!req.body.verifier) throw new BadRequestError('Missing verifier property in request body')
            res.send({
                'newVerifier': await this.verifierService.save(req.body.verifier as IVerifier)
            })
        } catch (error: any) {
            logger.error(error);
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findVerifiers(req: Request, res: Response) {
        try {
            res.send({
                'verifiers': await this.verifierService.findAll()
            })
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    // public async findOneVerifier(req: Request, res: Response) {
    //     try {
    //         if (!req.params.verifierId) throw new BadRequestError('Missing verifierId in request param');
    //         const verifier = await this.verifierService.findOne(req.params.verifierId);
    //         if (verifier === undefined) throw new NotFoundError('Verifier is not registered');
    //         res.send({
    //             'verifier': verifier
    //         })
    //     } catch (error: any) {
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async getVerifierProfile(req: Request, res: Response) {
    //     try {
    //         if (!req.params.verifierId) throw new BadRequestError('Missing verifierId in params');
    //         const verifier = await this.verifierService.findOne(req.params.verifierId);
    //         if (verifier === undefined) throw new NotFoundError("Verifier not found");

    //         const provider = await this.serviceProviderService.findOne(verifier.providerId);

    //         if (provider === undefined) throw new NotFoundError('Service Provider not found');

    //         res.send({
    //             'profile': {
    //                 'name': provider?.name,
    //                 'description': provider?.description,
    //                 'logo': provider.logoUrl,
    //                 'contact': provider.contact,
    //                 'website': provider.website,
    //                 'endpointUrl': verifier.endpointUrl
    //             }
    //         })
    //     } catch (error: any) {
    //         logger.error(error)
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async updateVerifierProfile(req: Request, res: Response) {
    //     try {
            
    //     } catch (error: any) {
    //         logger.error(error)
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async findVerifierServices(req: Request, res: Response) {
    //     try {
    //         if (!req.params.verifierId) throw new BadRequestError('Missing verifierId in request parmas');

    //         const services: any[] = await this.registryService.findServicesByVerifiers([req.params.verifierId]);
            
    //         await Promise.all(
    //             services.map(async (service: any) => { 
    //                 service['networkName'] = (await this.networkService.findNetworkById(service.network))?.name ?? 'Unknown';
    //                 await Promise.all(
    //                     service.requirements.map(async (req: any) => {
    //                         const issuers = await Promise.all(req.allowedIssuers.map((issuerId: string) => this.issuerService.findOne(issuerId)))
    //                         Object.assign(req, {
    //                             'schemaName': (await this.schemaService.findOne(req.schemaHash))?.title ?? 'Unknown',
    //                             'issuerNames': await Promise.all(issuers.map(async (issuer: any) => (await this.identityProviderService.findOne(issuer.providerId))?.name ?? 'Unknown'))
    //                         })
    //                     })
    //                 );
    //             })
    //         );
            
    //         res.send({ 'services': services })
    //     } catch (error: any) {
    //         logger.error(error)
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async findVerifierOperators(req: Request, res: Response) {
    //     try {
    //         if (!req.params.verifierId) throw new BadRequestError('Missing verifierId in request parmas');

    //         res.send({
    //             'operators': await this.operatorService.findByVerifier(req.params.verifierId) 
    //         });
    //     } catch (error: any) {
    //         logger.error(error);
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async addOperator(req: Request, res: Response) {
    //     try {
    //         if (!req.params.verifierId) throw new BadRequestError('Missing verifierId in request parmas');
    //         if (!req.body.operatorId) throw new BadRequestError('Missing operatorId in request body');

    //         const newOperator = await this.operatorService.addOperatorByVerifier(
    //             req.body.operatorId,
    //             req.params.verifierId
    //         )

    //         if (!newOperator) throw new BadRequestError('Operator existed');
    //         res.send({ 'newOperator': newOperator });
    //     } catch (error: any) {
    //         logger.error(error);
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async removeOperator(req: Request, res: Response) {
    //     try {
    //         if (!req.params.verifierId) throw new BadRequestError('Missing verifierId in request parmas');
    //         if (!req.params.operatorId) throw new BadRequestError('Missing operatorId in request body');

    //         const operator = await this.operatorService.removeOperatorByVerifier(
    //             req.params.operatorId,
    //             req.params.verifierId
    //         )

    //         if (!operator) throw new BadRequestError('Operator does not exist');
    //         res.send({ 'operator': operator });
    //     } catch (error: any) {
    //         logger.error(error);
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }
}