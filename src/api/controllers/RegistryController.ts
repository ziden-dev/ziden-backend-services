import { Request, Response } from 'express';
import axios from 'axios';

import { SchemaService } from '../services/SchemaService.js';
import { IssuerService } from '../services/IssuerService.js';
import { VerifierService } from '../services/VerifierService.js';
import { ISchemaRegistry } from '../models/SchemaRegistry.js';
import { sendRes } from '../responses/index.js';
import { BadRequestError } from '../errors/http/BadRequestError.js';
import { NotFoundError } from '../errors/http/NotFoundError.js';
import logger from '../../lib/logger/index.js';
import utils from '../utils/index.js';

export class SchemaRegistryResponse {
    public data: any;
}

export class RegistryController {

    schemaService: SchemaService;
    issuerService: IssuerService;
    verifierService: VerifierService;

    constructor() {
        this.schemaService = new SchemaService();
        this.issuerService = new IssuerService();
        this.verifierService = new VerifierService();

        this.findSchemaRegistries = this.findSchemaRegistries.bind(this);
        this.findSchemaRegistryById = this.findSchemaRegistryById.bind(this);
    }
    
    public async findSchemaRegistries(req: Request, res: Response) {
        try {
            let registries;

            if (req.query.issuerId) {
                const issuer = await this.issuerService.findOneById(req.query.issuerId as string);
                if (issuer === undefined) {
                    sendRes(res, null, {'registries':[]});
                    return;
                }
                try {
                    registries = (await axios.get(`${issuer.endpointUrl}/registries?issuerId=${issuer._id}`)).data;
                } catch (error: any) {
                    logger.error(error);
                    sendRes(res, null, {'registries':[]});
                    return;
                }
            } else {
                const issuers = await this.issuerService.findAll();
            
                registries = (await Promise.all(issuers.map(async(issuer) => {
                    try {
                        return (await axios.get(`${issuer.endpointUrl}/registries?issuerId=${issuer._id}`)).data;
                    } catch (error: any) {
                        logger.error(error);
                        return undefined;
                    }
                }))).flat();
            }
            
            if (req.query.schemaHash) {
                registries = registries.filter((registry: ISchemaRegistry) => registry.schemaHash == req.query.schemaHash);
            }

            const details = await Promise.all(registries.map(async (registry: ISchemaRegistry) => {
                const [schema, issuer, network] = await Promise.all([
                    this.schemaService.findOneById(registry.schemaHash),
                    this.issuerService.findOneById(registry.issuerId),
                    '' // FIXME: TBD after finishing network routes
                ]);

                return {
                    registry: {
                        registryId: registry._id,
                        description: registry.description,
                        expiration: registry.expiration,
                        updatable: registry.updatable,
                        endpointUrl: registry.endpointUrl,
                        schema: {
                            name: schema?.name ?? 'Unknown Schema',
                            schemaHash: schema?.hash ?? ''
                        },
                        issuer: {
                            issuerId: issuer?._id ?? '',
                            name: issuer?.name ?? 'Unknown Issuer',
                            logoUrl: issuer?.logoUrl ?? utils.getLogoUrl('')
                        },
                        network: {
                            networkId: 97,              // FIXME: TBD after finishing network routes
                            name: 'BNB Chain Testnet'   // FIXME: TBD after finishing network routes
                        }
                    }
                }
            }));
            sendRes(res, null, {'registries': details});
            return;
        } catch (error: any) {
            sendRes(res, error);
        }
    }

    public async findSchemaRegistryById(req: Request, res: Response) {
        try {
            if (!req.params.registryId) throw new BadRequestError('Missing registryId in request param');
            
            const issuers = await this.issuerService.findAll();
            const registry = (await Promise.all(issuers.map(async(issuer) => {
                try {
                    return (await axios.get(`${issuer.endpointUrl}/registries?issuerId=${issuer._id}`)).data;
                } catch (error: any) {
                    logger.error(error);
                    return undefined;
                }
            }))).flat().filter((reg: ISchemaRegistry) => (reg as any).id == req.params.registryId)[0];
            if (registry === undefined) throw new NotFoundError('Schema registry does not exist');
            
            const [schema, issuer, network] = await Promise.all([
                this.schemaService.findOneById(registry.schemaHash),
                this.issuerService.findOneById(registry.issuerId),
                '' // FIXME: TBD after finishing network routes
            ])
            sendRes(res, null, {
                registry: {
                    registryId: registry.id,
                    description: registry.description,
                    expiration: registry.expiration,
                    updatable: registry.updatable,
                    endpointUrl: registry.endpointUrl,
                    schema: {
                        name: schema?.name ?? 'Unknown Schema',
                        schemaHash: schema?.hash ?? ''
                    },
                    issuer: {
                        issuerId: issuer?._id ?? '',
                        name: issuer?.name ?? 'Unknown Issuer',
                        logoUrl: issuer?.logoUrl ?? utils.getLogoUrl('')
                    },
                    network: {
                        networkId: 97,              // FIXME: TBD after finishing network routes
                        name: 'BNB Chain Testnet'   // FIXME: TBD after finishing network routes
                    }
                }
            });
        } catch (error: any) {
            sendRes(res, error);
        }
    }
}