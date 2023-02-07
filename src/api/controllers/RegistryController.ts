import { Request, Response } from 'express';

import { SchemaService } from '../services/SchemaService.js';
import { RegistryService } from '../services/RegistryService.js';
import { IssuerService } from '../services/IssuerService.js';
import { VerifierService } from '../services/VerifierService.js';
import { ISchema } from '../models/Schema.js';
import { ISchemaRegistry } from '../models/SchemaRegistry.js';
import { IService } from '../models/Service.js';
import { BadRequestError } from '../errors/http/BadRequestError.js';
import { NotFoundError } from '../errors/http/NotFoundError.js';
import logger from '../../lib/logger/index.js';

export class SchemaRegistryResponse {
    public data: any;
}

export class RegistryController {

    schemaService: SchemaService;
    registryService: RegistryService;
    issuerService: IssuerService;
    verifierService: VerifierService;

    constructor() {
        this.schemaService = new SchemaService();
        this.registryService = new RegistryService();
        this.issuerService = new IssuerService();
        this.verifierService = new VerifierService();

        // this.registerSchema = this.registerSchema.bind(this);
        // this.findSchemaRegistries = this.findSchemaRegistries.bind(this);
        // this.findSchemaRegistryById = this.findSchemaRegistryById.bind(this);
        // this.updateSchemaRegistry = this.updateSchemaRegistry.bind(this);
        // this.toggleSchemaRegistryActive = this.toggleSchemaRegistryActive.bind(this);
        // this.registerService = this.registerService.bind(this);
        // this.findAllServices = this.findAllServices.bind(this);
        // this.findOneService = this.findOneService.bind(this);
        // this.fetchRegistryRequestPage = this.fetchRegistryRequestPage.bind(this);
        // this.updateService = this.updateService.bind(this);
        // this.toggleServiceActive = this.toggleServiceActive.bind(this);
    }

    // public async registerSchema(req: Request, res: Response) {
    //     try {
    //         if (!req.body.registry) throw new BadRequestError('Missing registry property in request body');
    //         if (!req.body.schema) throw new BadRequestError('Missing schema property in request body');

    //         const newSchema = await this.schemaService.save(req.body.schema);
    //         const schemaRegistry: ISchemaRegistry = {
    //             schemaHash: newSchema.schemaHash!,
    //             ...req.body.registry
    //         }
    //         const newSchemaRegistry = await this.registryService.saveSchemaRegistry(schemaRegistry);

    //         res.send({
    //             'registry': newSchemaRegistry,
    //             'schema': newSchema
    //         });
    //     } catch (error: any) {
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }
    
    // public async findSchemaRegistries(req: Request, res: Response) {
    //     try {
    //         const schemaHash = (req.query.schemaHash ?? '').toString();
    //         const issuerId = (req.query.issuerId ?? '').toString();
    //         const registries = await this.registryService.findRegistriesBySchemaAndIssuer(schemaHash, issuerId);
    //         await Promise.all(registries.map(async registry => {
    //             Object.assign(registry, {
    //                 schema: await this.schemaService.findOne(registry.schemaHash)
    //             })
    //         }));
    //         res.send({
    //             'registries': registries
    //         });
    //     } catch (error: any) {
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async findSchemaRegistryById(req: Request, res: Response) {
    //     try {
    //         if (!req.params.registryId) throw new BadRequestError('Missing registryId in request param');
    //         const registry = await this.registryService.findOneSchemaRegistry(req.params.registryId);
    //         if (registry === undefined) throw new NotFoundError('Schema registry does not exist');
    //         const schema = await this.schemaService.findOne(registry.schemaHash);
    //         console.log(schema);
    //         res.send({
    //             'registry': registry,
    //             'schema': schema
    //         })
    //     } catch (error: any) {
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public updateSchemaRegistry(req: Request, res: Response) {

    // }

    // public async toggleSchemaRegistryActive(req: Request, res: Response) {
    //     try {
    //         if (!req.params.registryId) throw new BadRequestError('Missing registryId in request param');
    //         const registry = await this.registryService.findOneSchemaRegistry(req.params.registryId);
    //         if (registry === undefined) throw new NotFoundError('Schema registry does not exist');

    //         registry.active = !registry.active;
    //         await this.registryService.saveSchemaRegistry(registry);
            
    //         res.send({
    //             'registryId': registry._id,
    //             'active': registry.active
    //         })

    //     } catch (error: any) {
    //         logger.error(error)
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async fetchRegistryRequestPage(req: Request, res: Response) {
    //     try {
    //         if (!req.params.registryId) throw new BadRequestError('Missing registryId in request param');
    //         const registry = await this.registryService.findOneSchemaRegistry(req.params.registryId);
    //         if (registry === undefined) throw new NotFoundError('Schema registry does not exist');
    //         const [schema, issuer] = await Promise.all([
    //             this.schemaService.findOne(registry.schemaHash),
    //             this.issuerService.findOne(registry.issuerId)
    //         ]);
    //         const provider = await this.identityProviderService.findOne(issuer!.providerId);
    //         res.send({
    //             'title': schema!.title,
    //             'provider': provider!.name,
    //             'description': registry.description,
    //             'logoUrl': provider!.logoUrl,
    //             'endpointUrl': registry.endpointUrl
    //         })
    //     } catch (error: any) {
    //         logger.error(error)
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async registerService(req: Request, res: Response) {
    //     try {
    //         if (!req.body.service) throw new BadRequestError('Missing service property in request body');
    //         res.send({
    //             'newService': await this.registryService.saveService(req.body.service as IService)
    //         })
    //     } catch (error: any) {
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async findAllServices(req: Request, res: Response) {
    //     try {
    //         const services = await this.registryService.findAllServices();
    //         const verifiers = await Promise.all(services.map(async service => this.verifierService.findOne(service.verifierId)));
    //         const providers = await Promise.all(verifiers.map(async verifier => await this.serviceProviderService.findOne(verifier!.providerId)));
    //         res.send({
    //             'services': services,
    //             'providers': providers
    //         });
    //     } catch (error: any) {
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async findOneService(req: Request, res: Response) {
    //     try {
    //         if (!req.params.serviceId) throw new BadRequestError('Missing serviceId in request param');
    //         const service = await this.registryService.findOneService(req.params.serviceId);
    //         if (service === undefined) throw new NotFoundError('Service does not exist');
    //         const issuerIds = [...new Set(service.requirements.map(req => req.allowedIssuers).flat())];
    //         const [verifier, ...issuers] = await Promise.all([
    //             this.verifierService.findOne(service.verifierId),
    //             ...issuerIds.map(issuerId => this.issuerService.findOne(issuerId))
    //         ]);
    //         const provider = await this.serviceProviderService.findOne(verifier!.providerId);
    //         res.send({
    //             'service': service,
    //             'verifier': verifier,
    //             'provider': provider,
    //             'issuersEndpointUrl': issuers.map(e => {
    //                 return {[e?._id!]: e?.endpointUrl}    
    //             })
    //         });
    //     } catch (error: any) {
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async updateService(req: Request, res: Response) {
    //     try {

    //     } catch (error: any) {
    //         logger.error(error)
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async toggleServiceActive(req: Request, res: Response) {
    //     try {
    //         if (!req.params.serviceId) throw new BadRequestError('Missing serviceId in request param');
    //         const service = await this.registryService.findOneService(req.params.serviceId);
    //         if (service === undefined) throw new NotFoundError('Service does not exist');

    //         service.active = !service.active;
    //         await this.registryService.saveService(service);
            
    //         res.send({
    //             'serviceId': service._id,
    //             'active': service.active
    //         })

    //     } catch (error: any) {
    //         logger.error(error)
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

}