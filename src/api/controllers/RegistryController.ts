import { Request, Response } from 'express';

import { SchemaService } from '../services/SchemaService';
import { RegistryService } from '../services/RegistryService';
import { IssuerService } from '../services/IssuerService';
import { IdentityProviderService } from '../services/IdentityProviderService';
import { ISchema } from '../models/Schema';
import { ISchemaRegistry } from '../models/SchemaRegistry';
import { IService } from '../models/Service';
import { BadRequestError } from '../errors/http/BadRequestError';
import { NotFoundError } from '../errors/http/NotFoundError';
import logger from '../../lib/logger';
import { ServiceProviderService } from '../services/ServiceProviderService';
import { VerifierService } from '../services/VerifierService';

export class SchemaRegistryResponse {
    public data: any;
}

export class RegistryController {

    schemaService: SchemaService;
    registryService: RegistryService;
    issuerService: IssuerService;
    verifierService: VerifierService;
    identityProviderService: IdentityProviderService;
    serviceProviderService: ServiceProviderService;

    constructor() {
        this.schemaService = new SchemaService();
        this.registryService = new RegistryService();
        this.issuerService = new IssuerService();
        this.verifierService = new VerifierService();
        this.identityProviderService = new IdentityProviderService();
        this.serviceProviderService = new ServiceProviderService();

        this.registerSchema = this.registerSchema.bind(this);
        this.findAllSchemaRegistries = this.findAllSchemaRegistries.bind(this);
        this.findOneSchemaRegistry = this.findOneSchemaRegistry.bind(this);
        this.registerService = this.registerService.bind(this);
        this.findAllServices = this.findAllServices.bind(this);
        this.findOneService = this.findOneService.bind(this);
        this.fetchRegistryRequestPage = this.fetchRegistryRequestPage.bind(this);
    }

    public async registerSchema(req: Request, res: Response) {
        try {
            if (req.body.newSchema === undefined) throw new BadRequestError('Missing newSchema property in request body');
            let schema: ISchema;
            if (req.body.newSchema) {
                if (req.body.schema === undefined) throw new BadRequestError('Missing schema property in request body');
                schema = await this.schemaService.save(req.body.schema as ISchema);
            } else {
                if (req.body.schemaHash === undefined) throw new BadRequestError('Missing schemaHash property in request body');
                const newSchema = await this.schemaService.findOne(req.body.schemaHash);
                if (newSchema === undefined) throw new NotFoundError('Schema does not exist');
                schema = newSchema;
            }
            const registry = req.body.registry;
            const schemaRegistry: ISchemaRegistry = {
                schemaHash: schema.schemaHash!,
                issuerId: registry.issuerId,
                description: registry.description,
                expiration: registry.expiration,
                updatable: registry.updatable,
                network: registry.network,
                endpointUrl: registry.endpointUrl
            }

            const newSchemaRegistry = await this.registryService.saveSchemaRegistry(schemaRegistry);
            res.send({
                'registry': newSchemaRegistry,
                'schema': schema
            });
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }
    
    public async findAllSchemaRegistries(req: Request, res: Response) {
        try {
            if (!req.query.schemaHash || !req.query.issuerId) {
                res.send({
                    'registries': await this.registryService.findAllSchemaRegistries()
                });
            } else {
                const [registry, schema] = await Promise.all([
                    this.registryService.findBySchemaAndIssuer(req.query.schemaHash as string, req.query.issuerId as string),
                    this.schemaService.findOne(req.query.schemaHash as string)
                ]);
                res.send({
                    'registry': registry,
                    'schema': schema
                });
            }
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findOneSchemaRegistry(req: Request, res: Response) {
        try {
            if (!req.params.registryId) throw new BadRequestError('Missing registryId in request param');
            const registry = await this.registryService.findOneSchemaRegistry(req.params.registryId);
            if (registry === undefined) throw new NotFoundError('Schema registry does not exist');
            const schema = await this.schemaService.findOne(registry.schemaHash);
            console.log(schema);
            res.send({
                'registry': registry,
                'schema': schema
            })
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    // public updateSchemaRegistry(registry: ISchemaRegistry): any {

    // }

    public async fetchRegistryRequestPage(req: Request, res: Response) {
        try {
            if (!req.params.registryId) throw new BadRequestError('Missing registryId in request param');
            const registry = await this.registryService.findOneSchemaRegistry(req.params.registryId);
            if (registry === undefined) throw new NotFoundError('Schema registry does not exist');
            const [schema, issuer] = await Promise.all([
                this.schemaService.findOne(registry.schemaHash),
                this.issuerService.findOne(registry.issuerId)
            ]);
            const provider = await this.identityProviderService.findOne(issuer!.providerId);
            res.send({
                'title': schema!.title,
                'provider': provider!.name,
                'description': registry.description,
                'logoUrl': provider!.logoUrl,
                'endpointUrl': registry.endpointUrl
            })
        } catch (error: any) {
            logger.error(error)
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async registerService(req: Request, res: Response) {
        try {
            if (!req.body.service) throw new BadRequestError('Missing service property in request body');
            res.send({
                'newService': await this.registryService.saveService(req.body.service as IService)
            })
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findAllServices(req: Request, res: Response) {
        try {
            const services = await this.registryService.findAllServices();
            const verifiers = await Promise.all(services.map(async service => this.verifierService.findOne(service.verifierId)));
            const providers = await Promise.all(verifiers.map(async verifier => await this.serviceProviderService.findOne(verifier!.providerId)));
            res.send({
                'services': services,
                'providers': providers
            });
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findOneService(req: Request, res: Response) {
        try {
            if (!req.params.serviceId) throw new BadRequestError('Missing serviceId in request param');
            const service = await this.registryService.findOneService(req.params.serviceId);
            if (service === undefined) throw new NotFoundError('Service does not exist');
            const issuerIds = [...new Set(service.requirements.map(req => req.allowedIssuers).flat())];
            const [verifier, ...issuers] = await Promise.all([
                this.verifierService.findOne(service.verifierId),
                ...issuerIds.map(issuerId => this.issuerService.findOne(issuerId))
            ]);
            const provider = await this.serviceProviderService.findOne(verifier!.providerId);
            res.send({
                'service': service,
                'verifier': verifier,
                'provider': provider,
                'issuersEndpointUrl': issuers.map(e => {
                    return {[e?._id!]: e?.endpointUrl}    
                })
            });
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    // public updateService(service: IService): any {
        
    // }
}