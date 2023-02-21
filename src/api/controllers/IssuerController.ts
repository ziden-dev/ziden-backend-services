import { Express, Request, Response } from "express";
import axios from "axios";

import { IssuerService } from "../services/IssuerService.js";
import { SchemaService } from "../services/SchemaService.js";
import { NetworkService } from "../services/NetworkService.js";
import { OperatorService } from "../services/OperatorService.js";
import { ISchemaRegistry } from "../models/SchemaRegistry.js";
import { NotFoundError } from "../errors/http/NotFoundError.js";
import { BadRequestError } from "../errors/http/BadRequestError.js";
import { sendRes } from "../responses/index.js";
import logger from "../../lib/logger/index.js";
import env from "../../lib/env/index.js";
import utils from "../utils/index.js";

export class IssuerController {
    
    issuerService: IssuerService;
    schemaService: SchemaService;
    networkService: NetworkService;
    operatorService: OperatorService;

    constructor() {
        this.issuerService = new IssuerService();
        this.schemaService = new SchemaService();
        this.networkService = new NetworkService();
        this.operatorService = new OperatorService();
        
        this.registration = this.registration.bind(this);
        this.findIssuers = this.findIssuers.bind(this);
        this.findOneIssuer = this.findOneIssuer.bind(this);
    }

    public async registration(req: Request, res: Response) {
        try {
            const logoUrl = utils.getLogoUrl(
                req.files === undefined ? '' :
                (req.files as {[fieldname: string]: Express.Multer.File[]})['issuerLogo'][0].filename
            );

            const issuer = {
                _id: req.body.issuerId.toString(),
                name: req.body.name.toString(),
                description: req.body.description.toString(),
                contact: req.body.contact.toString(),
                website: req.body.website.toString(),
                logoUrl: logoUrl,
                endpointUrl: req.body.endpointUrl.toString()
            }
            const newIssuer = await this.issuerService.createIssuer(issuer);
            if (newIssuer === false) throw new BadRequestError('Issuer existed');
            sendRes(res, null, { 'issuer': newIssuer });
        } catch (error: any) {
            logger.error(error);
            sendRes(res, error);
        }
    }

    public async findIssuers(req: Request, res: Response) {
        try {
            let issuers = await this.issuerService.findAll();

            // FIXME
            // if (req.query.schemaHashes) {
            //     let schemaHashes: string[] = [];
            //     if (Array.isArray(req.query.schemaHashes))
            //         schemaHashes = req.query.schemaHashes as string[];
            //     else
            //         schemaHashes = [req.query.schemaHashes as string];
            //     let registries = await this.registryService.findRegistriesBySchemas(schemaHashes);
            //     let filteredIssuerIds: string[] = registries.map(registry => registry.issuerId);
            //     issuers = issuers.filter(issuer => filteredIssuerIds.includes(issuer._id!));
            // }

            // FIXME: fetching supported networks from issuer v1
            // if (req.query.networks) {
            //     let networks: string[] = [];
            //     if (Array.isArray(req.query.networks))
            //         networks = req.query.networks as string[];
            //     else
            //         networks = [req.query.networks as string];
            //     issuers = issuers.filter(issuer => true);
            // }
            
            await Promise.all(
                issuers.map(async (issuer) => {
                    let registries: ISchemaRegistry[] = [];
                    try {                
                        registries = (await axios.get(`${issuer.endpointUrl}/registries?issuerId=${issuer._id}`)).data;
                    } catch (error: any) {
                        logger.error(error);
                    }
                    Object.assign(issuer, {
                        'issuerId': issuer._id,
                        'schemaRegistries': await Promise.all(registries.map(async(e: any) => {
                            return {
                                'registryId': e.id,
                                'name': (await this.schemaService.findOneById(e.schema.hash))?.name ?? 'Unknown schema',
                                'schemaHash': e.schema.hash,
                                'network': (await this.networkService.findOneById(e.network.networkId))?.name ?? 'BNB Testnet' // FIXME: TBU after finishing Network routes
                            }
                        }))
                    });
                    delete (issuer as any)._id;
                })
            );
            sendRes(res, null, { 'issuers': issuers });
        } catch(error: any) {
            sendRes(res, error);
        }
    }

    public async findOneIssuer(req: Request, res: Response) {
        try {
            const issuer = await this.issuerService.findOneById(req.params.issuerId);
            if (issuer === undefined) throw new NotFoundError('Issuer does not exist');

            Object.assign(issuer, {
                'issuerId': issuer._id
            });
            delete (issuer as any)._id;

            sendRes(res, null, { 'issuer': issuer });
        } catch (error: any) {
            sendRes(res, error);
        }
    }
}