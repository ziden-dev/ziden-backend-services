import { Request, Response } from 'express';
import axios from 'axios';

import { SchemaService } from '../services/SchemaService.js';
import { NetworkService } from '../services/NetworkService.js';
import { IssuerService } from '../services/IssuerService.js';
import { IClaim } from '../models/Claim.js';
import { BadRequestError } from '../errors/http/BadRequestError.js';
import { NotFoundError } from '../errors/http/NotFoundError.js';
import logger from '../../lib/logger/index.js';
import env from '../../lib/env/index.js';
import { sendRes } from '../responses/index.js';

export class ClaimController {

    schemaService: SchemaService;
    issuerService: IssuerService;
    networkService: NetworkService;

    constructor() {
        this.schemaService = new SchemaService();
        this.networkService = new NetworkService();
        this.issuerService = new IssuerService();

        this.findClaims = this.findClaims.bind(this);
    }

    public async findClaims(req: Request, res: Response) {
        try {
            let issuers = await this.issuerService.findAll();
        
            const query = {
                issuerId: req.query.issuerId ?? null,
                holderId: req.query.holderId ?? null,
                schemaHash: req.query.schemaHash ?? null,
                status: req.query.schemaHash ?? null,
                claimIds: req.query.claimIds ?? [],
            }
            
            // FIXME: to process issuerId query
            // if (req.query.issuerId) {
            //     issuers = issuers.filter(issuer => issuer._id == req.query.issuerId?.toString());
            // }

            let requestQuery = `?`;
            if (query.issuerId) requestQuery += `issuerId=${query.issuerId}`;
            if (query.holderId) requestQuery += `holderId=${query.holderId}`;
            if (query.schemaHash) requestQuery += `schemaHash=${query.schemaHash}`;

            const claims = (await Promise.all(issuers.map(async (issuer) => {
                try {
                    return (await axios.get(issuer.endpointUrl+'/claims'+requestQuery))?.data ?? undefined;
                } catch (error:any) {
                    logger.error(error);
                    return undefined;
                }
            }))).filter(e => e).flat();

            const details = await Promise.all(claims.map(async (claim: IClaim) => {
                const [schema, issuer] = await Promise.all([
                    this.schemaService.findOneById(claim.schemaHash ?? ''),
                    this.issuerService.findOneById(claim.issuerId ?? '')
                ])
                
                let entry;
                try {
                    entry = issuer
                            ? (await axios.get(issuer.endpointUrl+'/claims/'+claim.claimId+'/retrieve')).data
                            : undefined
                } catch (error: any) {
                    logger.error(error);
                }

                return {
                    claimId: claim.claimId,
                    status: claim.status,
                    entry: entry?.entry ?? {},
                    data: entry?.data ?? {},
                    schema: {
                        schemaHash: schema?.hash ?? '',
                        name: schema?.name ?? 'Unknown Schema'
                    },
                    issuer: {
                        issuerId: issuer?._id ?? '',
                        name: issuer?.name ?? 'Unknown Issuer',
                        endpointUrl: issuer?.endpointUrl ?? ''
                    }
                }
            }))
            sendRes(res, null, details);
        } catch (error: any) {
            logger.error(error);
            sendRes(res, error);
        }
    }
}