import { Request, Response } from "express";
import axios from "axios";

import { IssuerService } from "../services/IssuerService.js";
import { RegistryService } from "../services/RegistryService.js";
import { SchemaService } from "../services/SchemaService.js";
import { NetworkService } from "../services/NetworkService.js";
import { OperatorService } from "../services/OperatorService.js";
import { IIssuer } from "../models/Issuer.js";
import { NotFoundError } from "../errors/http/NotFoundError.js";
import { BadRequestError } from "../errors/http/BadRequestError.js";
import logger from "../../lib/logger/index.js";
import env from "../../lib/env/index.js";

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
        
        this.createIssuer = this.createIssuer.bind(this);
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

    public async createIssuer(req: Request, res: Response) {
        // try {
        //     res.send({
        //         'newIssuer': await this.issuerService.save(req.body.issuer)
        //     });
        // } catch (error: any) {
        //     logger.error(error);
        //     res.status(error.httpCode ?? 500).send(error);
        // }
    }

    public async findIssuers(req: Request, res: Response) {
        // try {
        //     let issuers = await this.issuerService.findAll();

        //     if (req.query.schemaHashes) {
        //         let schemaHashes: string[] = [];
        //         if (Array.isArray(req.query.schemaHashes))
        //             schemaHashes = req.query.schemaHashes as string[];
        //         else
        //             schemaHashes = [req.query.schemaHashes as string];
        //         const issuerIds = issuers.map(issuer => issuer._id ?? '');
        //         const registries = await this.registryService.findRegistriesByIssuers(issuerIds);

        //         const filteredIssuerIds = registries.map(reg => schemaHashes.includes(reg.schemaHash) ? reg.issuerId : '');
        //         issuers = issuers.filter(issuer => filteredIssuerIds.includes(issuer._id!));
        //     }

        //     if (req.query.networks) {
        //         let networks: string[] = [];
        //         if (Array.isArray(req.query.networks))
        //             networks = req.query.networks as string[];
        //         else
        //             networks = [req.query.networks as string];
        //         issuers = issuers.filter(issuer => issuer.supportedNetworks.map(network => networks.includes(network)).includes(true));
        //     }

        //     await Promise.all(
        //         issuers.map(async (issuer) => Object.assign(issuer, {
        //             'name': (await this.identityProviderService.findOne(issuer.providerId))?.name
        //         }))
        //     );

        //     res.send({ 'issuers': issuers });
        // } catch(error: any) {
        //     res.status(error.httpCode ?? 500).send(error);
        // }
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