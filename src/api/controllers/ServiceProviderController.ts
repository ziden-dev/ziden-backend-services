import { Request, Response } from "express";

import { ServiceProviderService } from "../services/ServiceProviderService.js";
import { VerifierService } from "../services/VerifierService.js";
import { RegistryService } from "../services/RegistryService.js";
import { NotFoundError } from "../errors/http/NotFoundError.js";
import { BadRequestError } from "../errors/http/BadRequestError.js";

export class ServiceProviderController {

    serviceProviderService: ServiceProviderService;
    verifierService: VerifierService;
    registryService: RegistryService;

    constructor() {
        this.serviceProviderService = new ServiceProviderService();
        this.verifierService = new VerifierService();
        this.registryService = new RegistryService();

        this.registerServiceProvider = this.registerServiceProvider.bind(this);
        this.findAllProviders = this.findAllProviders.bind(this);
        this.findOneProvider = this.findOneProvider.bind(this);
        this.findAllServicesOfProvider = this.findAllServicesOfProvider.bind(this);
        this.findAllVerifiersOfProvider = this.findAllVerifiersOfProvider.bind(this);
    }

    public async registerServiceProvider(req: Request, res: Response) {
        try {
            if (!req.body.provider) throw new BadRequestError('Missing provider property in request body');
            res.send({
                'newProvider': await this.serviceProviderService.save(req.body.provider)
            });
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findAllProviders(req: Request, res: Response) {
        try {
            res.send({
                'providers': await this.serviceProviderService.findAll()
            });
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findOneProvider(req: Request, res: Response) {
        try {
            if (!req.params.providerId) throw new BadRequestError('Missing providerId in request param');
            const serviceProvider = await this.serviceProviderService.findOne(req.params.providerId);
            if (serviceProvider == undefined) throw new NotFoundError('Service provider does not exist');
            res.send({
                'provider': serviceProvider
            });
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findAllServicesOfProvider(req: Request, res: Response) {
        try {
            if (!req.params.providerId) throw new BadRequestError('Missing providerId in request param');
            const verifierIds = (await this.verifierService.findByProvider(req.params.providerId)).map(verifier => verifier._id);
            const services = await this.registryService.findServicesByVerifiers(verifierIds);
            res.send({
                'services': services
            });
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findAllVerifiersOfProvider(req: Request, res: Response) {
        try {
            if (!req.params.providerId) throw new BadRequestError('Missing providerId in request param');
            res.send({
                'verifiers': await this.verifierService.findByProvider(req.params.providerId)
            });
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

}