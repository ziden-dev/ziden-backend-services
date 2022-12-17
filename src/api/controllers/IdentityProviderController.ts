import { Request, Response } from "express";

import { IdentityProviderService } from "../services/IdentityProviderService.js";
import { IssuerService } from "../services/IssuerService.js";
import { RegistryService } from "../services/RegistryService.js";
import { SchemaService } from "../services/SchemaService.js";
import { IIdentityProvider } from "../models/IdentityProvider.js";
import { NotFoundError } from "../errors/http/NotFoundError.js";
import { BadRequestError } from "../errors/http/BadRequestError.js";
import logger from "../../lib/logger/index.js";

export class IdentityProviderController {

    identityProviderService: IdentityProviderService;
    issuerService: IssuerService;
    registryService: RegistryService;
    schemaService: SchemaService;

    constructor() { 
        this.identityProviderService = new IdentityProviderService();
        this.issuerService = new IssuerService();
        this.registryService = new RegistryService();
        this.schemaService = new SchemaService();

        this.registerIdentityProvider = this.registerIdentityProvider.bind(this);
        this.findAllProviders = this.findAllProviders.bind(this);
        this.findOneProvider = this.findOneProvider.bind(this);
        this.findAllSchemasOfProvider = this.findAllSchemasOfProvider.bind(this);
        this.findAllIssuersOfProvider = this.findAllIssuersOfProvider.bind(this);
    }

    public async registerIdentityProvider(req: Request, res: Response) {
        try {
            if (!req.body.provider) throw new BadRequestError('Missing provider property in request body');
            res.send({
                'newProvider': await this.identityProviderService.save(req.body.provider as IIdentityProvider)
            })
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findAllProviders(req: Request, res: Response) {
        try {
            res.send({
                'providers': await this.identityProviderService.findAll()
            })
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findOneProvider(req: Request, res: Response) {
        try {
            if(!req.params.providerId) throw new BadRequestError('Missing providerId in request param');
            const identityProvider = await this.identityProviderService.findOne(req.params.providerId);
            if (identityProvider === undefined) throw new NotFoundError('Identity provider does not exist');
            res.send({
                'provider': identityProvider
            })
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findAllSchemasOfProvider(req: Request, res: Response) {
        try {
            if (!req.params.providerId) throw new BadRequestError('Missing providerId in request param');
            const issuerIds = (await this.issuerService.findByProvider(req.params.providerId)).map(issuer => issuer._id!);
            const registries = await this.registryService.findSchemaRegistriesByIssuers(issuerIds);
            await Promise.all(registries.map(async (registry) => Object.assign(registry, {
                name: (await this.schemaService.findOne(registry.schemaHash))!.title
            })));
            res.send({
                'registries': registries
            })
        } catch (error: any) {
            logger.error(error)
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findAllIssuersOfProvider(req: Request, res: Response) {
        try {
            if (!req.params.providerId) throw new BadRequestError('Missing providerId in request param');
            res.send({
                'issuers': await this.issuerService.findByProvider(req.params.providerId)
            })
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

}