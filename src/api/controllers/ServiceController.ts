import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

import { ServiceService } from '../services/ServiceService.js';
import { SchemaService } from '../services/SchemaService.js';
import { IssuerService } from '../services/IssuerService.js';
import { VerifierService } from '../services/VerifierService.js';
import Service, { IService } from '../models/Service.js';
import { sendRes } from '../responses/index.js';
import { BadRequestError } from '../errors/http/BadRequestError.js';
import { NotFoundError } from '../errors/http/NotFoundError.js';
import logger from '../../lib/logger/index.js';
import { DefaultEndpoint } from '../../lib/constants/index.js';
import utils from '../utils/index.js';
import env from '../../lib/env/index.js';
import { UnauthorizedError } from '../errors/http/UnauthorizedError.js';
import { verifyTokenAdmin } from '../services/Authen.js';

export class ServiceController {

    serviceService: ServiceService;
    schemaService: SchemaService;
    issuerService: IssuerService;
    verifierService: VerifierService;

    constructor() {
        this.serviceService = new ServiceService();
        this.schemaService = new SchemaService();
        this.issuerService = new IssuerService();
        this.verifierService = new VerifierService();

        this.registerService = this.registerService.bind(this);
        this.findServiceById = this.findServiceById.bind(this);
        this.findServices = this.findServices.bind(this);
        this.fetchProofRequest = this.fetchProofRequest.bind(this);
        this.updateService = this.updateService.bind(this);
        this.toggleServiceActive = this.toggleServiceActive.bind(this);
        this.checkServiceAuthen = this.checkServiceAuthen.bind(this);
    }

    public async findServiceById(req: Request, res: Response) {
        try {
            if (!req.params.serviceId) throw new BadRequestError('Missing serviceId in request param');
            
            const service = await this.serviceService.findOneById(req.params.serviceId);
            if (service === undefined) throw new NotFoundError('Service does not exist');

            const [verifier, network] = await Promise.all([
                this.verifierService.findOneById(service.verifierId),
                '' // FIXME: TBD after finishing network routes
            ]);

            sendRes(res, null, {
                service: {
                    serviceId: service._id,
                    name: service.name,
                    description: service.description,
                    endpointUrl: service.endpointUrl,
                    verifier: {
                        verifierId: verifier?._id ?? '',
                        name: verifier?.name ?? 'Unknown Verifier',
                        logoUrl: utils.getLogoUrl(''),
                        contact: verifier?.contact ?? '',
                        website: verifier?.website ?? ''
                    },
                    network: {
                        networkId: 97,              // FIXME: TBD after finishing network routes
                        name: 'BNB Chain Testnet'   // FIXME: TBD after finishing network routes
                    },
                    requirements: await Promise.all(service.requirements.map(async (req) => {
                        const [issuers, schema] = await Promise.all([
                            Promise.all(req.allowedIssuers.map(async (issuerId) => await this.issuerService.findOneById(issuerId))),
                            this.schemaService.findOneById(req.schemaHash)
                        ]);
                        Object.assign(req, {
                            'allowedIssuers': issuers.map(issuer => {
                                return {
                                    'issuerId': issuer?._id ?? '',
                                    'name': issuer?.name ?? 'Unknown Issuer',
                                    'endpointUrl': issuer?.endpointUrl ?? ''
                                }
                            }),
                            'schema': {
                                'name': schema?.name ?? 'Unknown Schema',
                                'schemaHash': schema?.hash ?? ''
                            }
                        });
                        return req;
                    })),
                    active: service.active
                }
            });
        } catch (error: any) {
            sendRes(res, error);
        }
    }

    public async registerService(req: Request, res: Response) {
        try {
            const verifierId = req.body.verifierId;
            const token = req.headers.authorization;
            if (!verifierId || !token) {
                throw new BadRequestError("Invalid token!");
            }
            const isTokenValid = await verifyTokenAdmin(token, verifierId);
            if (!isTokenValid) {
                throw new BadRequestError("Invalid token!");
            } 

            if (!req.body.verifierId
            || !req.body.networkId
            || !req.body.requirements
            ) throw new BadRequestError('Missing service property in request body');
            const service = {
                name: req.body.name ?? 'Unnamed Service',
                verifierId: req.body.verifierId,
                description: req.body.description ?? 'This service does not have any description',
                networkId: req.body.networkId,
                requirements: req.body.requirements,
                endpointUrl: req.body.endpointUrl ?? utils.getDefaultUrl(DefaultEndpoint.Service, env.app.hostname, req.body.verifierId),
                active: true
            }

            const newService = await this.serviceService.createService(service);
            if (!newService) throw new BadRequestError('Service existed');
            sendRes(res, null, {service: newService});
        } catch (error: any) {
            sendRes(res, error);
        }
    }

    public async findServices(req: Request, res: Response) {
        try {
            let query: any = {};

            if (req.query.active != undefined) {
                query["active"] = req.query.active;
            }

            if (req.query.verifierId != undefined) {
                console.log(req.query.verifierId);
                query["verifierId"] = req.query.verifierId;
            }

            if (req.query.networkId != undefined) {
                // query["networdId"] = req.query.networdId;
            }

            let services = await this.serviceService.findAll(query);

            sendRes(res, null, {services: await Promise.all(services.map(async (service) => {
                const [verifier, network] = await Promise.all([
                    this.verifierService.findOneById(service.verifierId),
                    '' // FIXME: TBD after finishing network routes
                ]);

                return {
                    serviceId: service._id,
                    name: service.name,
                    description: service.description,
                    endpointUrl: service.endpointUrl,
                    verifier: {
                        verifierId: verifier?._id ?? '',
                        name: verifier?.name ?? 'Unknown Verifier',
                        logoUrl: utils.getLogoUrl(''),
                        contact: verifier?.contact ?? '',
                        website: verifier?.website ?? ''
                    },
                    network: {
                        networkId: 97,              // FIXME: TBD after finishing network routes
                        name: 'BNB Chain Testnet'   // FIXME: TBD after finishing network routes
                    },
                    requirements: await Promise.all(service.requirements.map(async (req) => {
                        const [issuers, schema] = await Promise.all([
                            Promise.all(req.allowedIssuers.map(async (issuerId) => await this.issuerService.findOneById(issuerId))),
                            this.schemaService.findOneById(req.schemaHash)
                        ]);
                        Object.assign(req, {
                            'allowedIssuers': issuers.map(issuer => {
                                return {
                                    'issuerId': issuer?._id ?? '',
                                    'name': issuer?.name ?? 'Unknown Issuer',
                                    'endpointUrl': issuer?.endpointUrl ?? ''
                                }
                            }),
                            'schema': {
                                'name': schema?.name ?? 'Unknown Schema',
                                'schemaHash': schema?.hash ?? ''
                            }
                        });
                        return req;
                    })),
                    active: service.active
                }
            }))});
        } catch (error: any) {
            sendRes(res, error);
        }
    }

    public async fetchProofRequest(req: Request, res: Response) {
        try {
            if (!req.body.service) throw new BadRequestError('Missing service property in request body');
            sendRes(res, null, {});
        } catch (error: any) {
            sendRes(res, error);
        }
    }

    public async updateService(req: Request, res: Response) {
        try {
            if (!req.body.service) throw new BadRequestError('Missing service property in request body');
            sendRes(res, null, {});
        } catch (error: any) {
            sendRes(res, error);
        }
    }

    public async toggleServiceActive(req: Request, res: Response) {
        try {
            const serviceId = req.params.serviceId;
            if (!serviceId || typeof serviceId != "string") {
                throw new BadRequestError("Invalid serviceId");
            }

            const service = await Service.findById(serviceId);
            if (!service) {
                throw new BadRequestError("Service not exited!");
            }

            service.active = !service.active;
            await service.save();

            sendRes(res, null, {serviceId: serviceId, active: service.active});
        } catch (err: any) {
            console.log(err);

            sendRes(res, err);
            return;
        }
    }

    public async checkServiceAuthen(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new UnauthorizedError("Invalid token");
            }
            const serviceId = req.params.serviceId;
            if (!serviceId || typeof serviceId != "string") {
                throw new BadRequestError("Invalid serviceId");
            }
            const service = await this.serviceService.findOneById(serviceId);
            if (!service) {
                throw new BadRequestError("Service not exited!");
            }

            const verifierId = service.verifierId;
            const isTokenValid = await verifyTokenAdmin(token, verifierId);
            if (isTokenValid) {
                next();
                return;
            } else {
                throw new UnauthorizedError("Invalid token");
            }

        } catch (err: any) {
            sendRes(res, err);
            return;
        }
        
    }

}