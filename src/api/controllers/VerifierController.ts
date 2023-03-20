import axios from "axios";
import { Request, Response } from "express";

import { VerifierService } from "../services/VerifierService.js";
import { OperatorService } from "../services/OperatorService.js";
import { NetworkService } from "../services/NetworkService.js";
import { IVerifier } from "../models/Verifier.js";
import { IService } from "../models/Service.js";
import { UploadedFile } from "../middlewares/UploadMiddleware.js";
import { NotFoundError } from "../errors/http/NotFoundError.js";
import { BadRequestError } from "../errors/http/BadRequestError.js";
import logger from "../../lib/logger/index.js";
import env from "../../lib/env/index.js";
import utils from "../utils/index.js";
import { sendRes } from "../responses/index.js";
import { registerNewVerifier } from "../services/Authen.js";

export class VerifierController {

    verifierService: VerifierService;
    operatorService: OperatorService;


    constructor() {
        this.verifierService = new VerifierService();
        this.operatorService = new OperatorService();


        this.registration = this.registration.bind(this);
        this.findVerifiers = this.findVerifiers.bind(this);
        this.findOneVerifier = this.findOneVerifier.bind(this);
        // this.getVerifierProfile = this.getVerifierProfile.bind(this);
        // this.updateVerifierProfile = this.updateVerifierProfile.bind(this);
        // this.findVerifierServices = this.findVerifierServices.bind(this);
        // this.findVerifierOperators = this.findVerifierOperators.bind(this);
        // this.addOperator = this.addOperator.bind(this);
        // this.removeOperator = this.removeOperator.bind(this);
        // this.registration = this.registration.bind(this);
    }

    public async registration(req: Request, res: Response) {
        try {
            const logo = (req.files as UploadedFile)['verifierLogo'] === undefined ? '' :
                        (req.files as UploadedFile)['verifierLogo'][0].filename;

            const verifier: IVerifier = {
                _id: req.body.verifierId.toString(),
                name: req.body.name.toString(),
                description: req.body.description.toString(),
                contact: req.body.contact.toString(),
                isVerified: true,
                website: req.body.website.toString(),
                logoUrl: logo,
                endpointUrl: req.body.endpointUrl?.toString()
            }
            const newVerifier = await this.verifierService.createVerifier(verifier);
            if (newVerifier === false) throw new BadRequestError('verifier existed');
            
            const registerVerifier = await registerNewVerifier(verifier._id);
            console.log(registerVerifier);
            sendRes(res, null, { 'verifier': newVerifier });
        
        } catch (error: any) {
            logger.error(error);
            console.log(error);
            sendRes(res, error);
        }
    }

    public async findVerifiers(req: Request, res: Response) {
        try {
            sendRes(res, null, {
                'verifiers': (await this.verifierService.findAll()).map(e => {
                    return {
                        '_id': e._id,
                        'name': e.name,
                        'description': e.description,
                        'contact': e.contact,
                        'isVerified': e.isVerified,
                        'website': e.website,
                        'logoUrl': utils.getLogoUrl(e.logoUrl)
                    }
                })
            })
        } catch (error: any) {
            logger.error(error);
            sendRes(res, error);
        }
    }

    public async findOneVerifier(req: Request, res: Response) {
        try {
            if (!req.params.verifierId) throw new BadRequestError('Missing verifierId in request param');
            const verifier = await this.verifierService.findOneById(req.params.verifierId);
            if (verifier === undefined) throw new NotFoundError('Verifier is not registered');

            Object.assign(verifier, {
                'verifierId': verifier._id,
                'logoUrl': utils.getLogoUrl(verifier.logoUrl)
            });
            delete (verifier as any)._id;

            sendRes(res, null, { 'verifier': verifier });
        } catch (error: any) {
            sendRes(res, error);
        }
    }

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
    //                         const verifiers = await Promise.all(req.allowedverifiers.map((verifierId: string) => this.verifierService.findOne(verifierId)))
    //                         Object.assign(req, {
    //                             'schemaName': (await this.schemaService.findOne(req.schemaHash))?.title ?? 'Unknown',
    //                             'verifierNames': await Promise.all(verifiers.map(async (verifier: any) => (await this.identityProviderService.findOne(verifier.providerId))?.name ?? 'Unknown'))
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