import { Request, Response } from 'express';
import axios from 'axios';

import { SchemaService } from '../services/SchemaService.js';
import { IssuerService } from '../services/IssuerService.js';
import { IdentityProviderService } from '../services/IdentityProviderService.js';
import { BadRequestError } from '../errors/http/BadRequestError.js';
import { NotFoundError } from '../errors/http/NotFoundError.js';
import logger from '../../lib/logger/index.js';

export class ClaimController {

    schemaService: SchemaService;
    issuerService: IssuerService;
    identityProviderService: IdentityProviderService;

    constructor() {
        this.schemaService = new SchemaService();
        this.issuerService = new IssuerService();
        this.identityProviderService = new IdentityProviderService();

        this.fetchClaimMetadata = this.fetchClaimMetadata.bind(this);
    }

    public async fetchClaimMetadata(req: Request, res: Response) {
        try {
            if (!req.query.claimId) throw new BadRequestError('Missing claimId in request query');
            if (!req.query.schemaHash) throw new BadRequestError('Missing schemaHash in request query');
            if (!req.query.issuerId) throw new BadRequestError('Missing issuerId in request query');

            const [schema, issuer] = await Promise.all([
                this.schemaService.findOne(req.query.schemaHash as string),
                this.issuerService.findOne(req.query.issuerId as string)
            ])

            if (schema === undefined || issuer === undefined) throw new NotFoundError();
            
            const [provider, status] = await Promise.all([
                this.identityProviderService.findOne(issuer.providerId),
                axios.get(`${issuer.endpointUrl}/claims/${req.query.claimId}/status`)
            ]);

            res.send({
                'schema': {
                    'schemaHash': schema.schemaHash,
                    'title': schema.title
                },
                'issuer': {
                    'issuerId': issuer._id,
                    'endpointUrl': issuer.endpointUrl
                },
                'provider': {
                    'name': provider!.name
                },
                'status': status.data.data.status ?? 'UNKNOWN'
            })
        } catch (error: any) {
            logger.error(error);
            res.status(error.httpCode ?? 500).send(error);
        }
    }

}