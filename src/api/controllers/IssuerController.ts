import { Express, Request, Response } from "express";
import axios from "axios";

import { IssuerService } from "../services/IssuerService.js";
import { RegistryService } from "../services/RegistryService.js";
import { SchemaService } from "../services/SchemaService.js";
import { NetworkService } from "../services/NetworkService.js";
import { OperatorService } from "../services/OperatorService.js";
import { NotFoundError } from "../errors/http/NotFoundError.js";
import { BadRequestError } from "../errors/http/BadRequestError.js";
import { sendRes } from "../responses/index.js";
import logger from "../../lib/logger/index.js";
import env from "../../lib/env/index.js";
import utils from "../utils/index.js";

export class IssuerController {
    
    issuerService: IssuerService;
    registryService: RegistryService;
    schemaService: SchemaService;
    networkService: NetworkService;
    operatorService: OperatorService;

    constructor() {
        this.issuerService = new IssuerService();
        this.registryService = new RegistryService();
        this.schemaService = new SchemaService();
        this.networkService = new NetworkService();
        this.operatorService = new OperatorService();
        
        this.registration = this.registration.bind(this);
        this.findIssuers = this.findIssuers.bind(this);
        // this.findOneIssuer = this.findOneIssuer.bind(this);
        // this.getIssuerProfile = this.getIssuerProfile.bind(this);
        // this.updateIssuerProfile = this.updateIssuerProfile.bind(this);
        // this.findIssuerSchemas = this.findIssuerSchemas.bind(this);
        // this.findIssuerOperators = this.findIssuerOperators.bind(this);
        // this.addOperator = this.addOperator.bind(this);
        // this.removeOperator = this.removeOperator.bind(this);
        // this.registration = this.registration.bind(this);
    }

    public async registration(req: Request, res: Response) {
        try {
            const logoUrl = utils.getLogoUrl(
                req.files === undefined ?
                utils.getLogoUrl('') :
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

            if (req.query.schemaHashes) {
                let schemaHashes: string[] = [];
                if (Array.isArray(req.query.schemaHashes))
                    schemaHashes = req.query.schemaHashes as string[];
                else
                    schemaHashes = [req.query.schemaHashes as string];
                let registries = await this.registryService.findRegistriesBySchemas(schemaHashes);
                let filteredIssuerIds: string[] = registries.map(registry => registry.issuerId);
                issuers = issuers.filter(issuer => filteredIssuerIds.includes(issuer._id!));
            }

            if (req.query.networks) {
                let networks: string[] = [];
                if (Array.isArray(req.query.networks))
                    networks = req.query.networks as string[];
                else
                    networks = [req.query.networks as string];
                
                // FIXME: fetching supported networks from issuer v1
                issuers = issuers.filter(issuer => true);
            }

            const registries = await this.registryService.findRegistriesByIssuers(issuers.map(e => e._id));
            await Promise.all(
                issuers.map(async (issuer) => Object.assign(issuer, {
                    'schemaRegistries': registries.map(async(e) => {
                        return {
                            'name': (await this.schemaService.findOneById(e.schemaHash))?.name ?? 'Unknown schema',
                            'hash': e.schemaHash,
                            'network': (await this.networkService.findOneById(e.networkId))?.name ?? 'Unknown network'
                        }
                    })
                }))
            );
            sendRes(res, null, { 'issuers': issuers });
        } catch(error: any) {
            sendRes(res, error);
        }
    }

    // public async findOneIssuer(req: Request, res: Response) {
    //     try {
    //         const issuer = await this.issuerService.findOne(req.params.issuerId);
    //         if (issuer === undefined) throw new NotFoundError("Issuer not founded");
            
    //         const networks = await Promise.all(issuer.supportedNetworks.map(async (networkId, index) => 
    //             (await this.networkService.findNetworkById(networkId))?.name ?? 'Unknown'
    //         ));

    //         Object.assign(issuer, { 'networks': networks });
            
    //         res.send({ 'issuer': issuer });
    //     } catch(error: any) {
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async getIssuerProfile(req: Request, res: Response) {
    //     try {
    //         if (!req.params.issuerId) throw new BadRequestError('Missing issuerId in params');
    //         const issuer = await this.issuerService.findOne(req.params.issuerId);
    //         if (issuer === undefined) throw new NotFoundError("Issuer not found");

    //         const [provider, issuerClaims] = await Promise.all([
    //             this.identityProviderService.findOne(issuer.providerId),
    //             axios.get(`${issuer.endpointUrl}/claims`)
    //         ]);

    //         if (provider === undefined) throw new NotFoundError('Identity Provider not found');

    //         const numPublishedClaims = (issuerClaims.data.data.filter((e: any) => !['PENDING', 'REVIEWING, REJECT'].includes(e?.status)).length ?? 0);

    //         const numHolders = (new Set(issuerClaims.data.data.map((e: any) => e?.holderId))).size ?? 0;
    //         res.send({
    //             'profile': {
    //                 'name': provider?.name,
    //                 'desription': provider?.description,
    //                 'logo': provider.logoUrl,
    //                 'numPublishedClaims': numPublishedClaims,
    //                 'numHolders': numHolders,
    //                 'contact': provider.contact,
    //                 'website': provider.website,
    //                 'endpointUrl': issuer.endpointUrl
    //             }
    //         })
    //     } catch (error: any) {
    //         logger.error(error);
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async updateIssuerProfile(req: Request, res: Response) {
    //     try {
    //         if (!req.params.issuerId) throw new BadRequestError('Missing issuerId in request params');
    //         if (!req.body.issuer) throw new BadRequestError('Missing issuer in request body');

    //         const issuer = await this.issuerService.findOne(req.params.issuerId);
    //         if (issuer === undefined) throw new NotFoundError('Issuer not found');

    //         const updateInfo = {
    //             'endpointUrl': req.body.issuer.endpointUrl ?? issuer.endpointUrl
    //         }

    //         Object.assign(issuer, updateInfo);

    //         const updatedIssuer = await this.issuerService.save(issuer);

    //         res.send({ 'update': updateInfo });
    //     } catch (error: any) {            
    //         logger.error(error);
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async findIssuerSchemas(req: Request, res: Response) {
    //     try {
    //         if (!req.params.issuerId) throw new BadRequestError('Missing issuerId in params');
    //         const [schemaRegistries, issuer] = await Promise.all([
    //             this.registryService.findRegistriesBySchemaAndIssuer('', req.params.issuerId),
    //             this.issuerService.findOne(req.params.issuerId)
    //         ]);
    //         const issuerClaims = (await axios.get(`${issuer?.endpointUrl}/claims`))?.data.data || [];
            
    //         const schemas = await Promise.all(schemaRegistries.map(async registry => {
    //             const schema = await this.schemaService.findOne(registry.schemaHash);
    //             const numPublishedClaims = issuerClaims.filter((claim: any) => claim.schemaHash.toString() == registry.schemaHash.toString()).length;
    //             return {
    //                 'registryId': registry._id,
    //                 'title': schema?.title || 'Unknown',
    //                 'schemaHash': schema?.schemaHash,
    //                 'numPublishedClaims': numPublishedClaims ?? 0,
    //                 'createdAt': registry.createdAt,
    //                 'active': registry.active
    //             }
    //         }));

    //         res.send({ 'schemas': schemas })

    //     } catch (error: any) {
    //         logger.error(error);
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    // public async registration(req: Request, res: Response) {
    //     try {
    //         const identityProvider: IIdentityProvider = {
    //             name: req.body.name ?? 'Anonymous',
    //             description: req.body.description ?? 'No information',
    //             contact: req.body.contact ?? 'No information',
    //             website: req.body.website ?? 'No information',
    //             logoUrl: `https://${env.app.host}/uploads/${req.file?.filename}`
    //         }
    //         logger.info(identityProvider);
    //         const newProvider = await this.identityProviderService.save(identityProvider);
            
    //         const issuer: IIssuer = {
    //             _id: req.body.issuerId,
    //             providerId: newProvider._id!,
    //             endpointUrl: `https://issuer-staging.ziden.io/api`,
    //             supportedNetworks: ['66666']
    //         }
    //         const newIssuer = await this.issuerService.save(issuer);
    //         res.send();
    //     } catch (error: any) {
    //         logger.error(error);
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }
}