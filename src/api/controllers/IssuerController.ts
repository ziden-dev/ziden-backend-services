import { Express, Request, Response } from "express";
import axios from "axios";

import { IssuerService } from "../services/IssuerService.js";
import { SchemaService } from "../services/SchemaService.js";
import { NetworkService } from "../services/NetworkService.js";
import { OperatorService } from "../services/OperatorService.js";
import { UploadedFile } from "../middlewares/UploadMiddleware.js";
import { ISchemaRegistry } from "../models/SchemaRegistry.js";
import { NotFoundError } from "../errors/http/NotFoundError.js";
import { BadRequestError } from "../errors/http/BadRequestError.js";
import { sendRes } from "../responses/index.js";
import logger from "../../lib/logger/index.js";
import env from "../../lib/env/index.js";
import utils from "../utils/index.js";
import { UnauthorizedError } from "../errors/http/UnauthorizedError.js";
import { verifyTokenAdmin } from "../services/Authen.js";

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
        this.updateIssuer = this.updateIssuer.bind(this);
    }

    public async registration(req: Request, res: Response) {
        try {
            const logo = (req.files as UploadedFile)['issuerLogo'] === undefined ? '' :
                        (req.files as UploadedFile)['issuerLogo'][0].filename;

            const issuer = {
                _id: String(req.body.issuerId),
                name: String(req.body.name),
                description: String(req.body.description),
                contact: String(req.body.contact),
                website: String(req.body.website),
                logoUrl: logo,
                endpointUrl: String(req.body.endpointUrl)
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

            let registries: ISchemaRegistry[] = [];

            // FIXME
            if (req.query.schemaHash || req.query.networkId) {
                const query = `?${req.query.schemaHash ? 'schemaHash='+req.query.schemaHash : ''}`
                + `&${req.query.networkId ? 'network='+req.query.networkId : ''}`;
                
                const filtered = (await Promise.all(
                    issuers.map(async (issuer) => {
                        try {                
                            registries = (await axios.get(`${issuer.endpointUrl}/registries${query}&issuerId=${issuer._id}`)).data;
                        } catch (error: any) {
                            logger.error(error);
                        }
                        if (registries.length == 0) return;
                        
                        return issuer._id;
                    })
                )).filter(e => e !== undefined);
                issuers = issuers.filter(issuer => filtered.includes(issuer._id));
            }

            await Promise.all(
                issuers.map(async (issuer) => {
                    try {                
                        registries = (await axios.get(`${issuer.endpointUrl}/registries?issuerId=${issuer._id}`)).data;
                    } catch (error: any) {
                        logger.error(error);
                    }
                    Object.assign(issuer, {
                        'issuerId': issuer._id,
                        'logoUrl': utils.getLogoUrl(issuer.logoUrl),
                        'schemaRegistries': await Promise.all(registries.map(async(e: any) => {
                            return {
                                'registryId': e.id,
                                'name': (await this.schemaService.findOneById(e.schema.hash))?.name ?? 'Unknown schema',
                                'schemaHash': e.schema.hash,
                                'network': (await this.networkService.findOneById(e.network.networkId))?.name ?? 'Unknown Network',
                                'isActive': e.isActive ?? false
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
            if (!req.params.issuerId) throw new BadRequestError('Missing issuerId in request param');
            const issuer = await this.issuerService.findOneById(req.params.issuerId);
            if (issuer === undefined) throw new NotFoundError('Issuer does not exist');

            Object.assign(issuer, {
                'issuerId': issuer._id,
                'logoUrl': utils.getLogoUrl(issuer.logoUrl)
            });
            delete (issuer as any)._id;

            sendRes(res, null, { 'issuer': issuer });
        } catch (error: any) {
            sendRes(res, error);
        }
    }

    public async updateIssuer(req: Request, res: Response) {
        try {
            const {issuerId} = req.params;
            const token = req.headers.authorization;
            if (!issuerId || !token) {
                throw new UnauthorizedError("Invalid token");
            }
            const isTokenValid = await verifyTokenAdmin(token, issuerId);
            if (!isTokenValid) {
                throw new UnauthorizedError("Invalid token");
            }

            const logo = (req.files as UploadedFile)['issuerLogo'] === undefined ? '' :
                (req.files as UploadedFile)['issuerLogo'][0].filename

            const issuer = await this.issuerService.findOneById(req.params.issuerId);
            if (issuer === undefined) throw new NotFoundError('Issuer does not exist');

            const updatedIssuer = await this.issuerService.updateIssuer({
                _id: issuer?._id,
                name: String(req.body.name || issuer.name),
                description: String(req.body.description || issuer.description),
                contact: String(req.body.contact || issuer.contact),
                isVerified: issuer.isVerified || false,          // FIXME
                website: String(req.body.website || issuer.website),
                logoUrl: String(logo || issuer.logoUrl),
                endpointUrl: String(req.body.endpointUrl || issuer.endpointUrl)
            })

            if (!updatedIssuer) throw new NotFoundError('Issuer does not exist');

            sendRes(res, null);
        } catch (error: any) {
            logger.error(error);
            sendRes(res, error);
        }
    }
}