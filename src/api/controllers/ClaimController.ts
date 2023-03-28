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
            
            let claimIds = req.query.claimIds;
            if (!claimIds) {
                claimIds = [];
            }
            if (typeof claimIds == "string") {
                claimIds = [claimIds];
            }
            claimIds = claimIds as string[];

            let query: any = {
                issuerId: req.query.issuerId ?? null,
                holderId: req.query.holderId ?? null,
                schemaHash: req.query.schemaHash ?? null,
                status: req.query.schemaHash ?? null,
                claimIds: claimIds,
            }

            // FIXME: to process issuerId query
            // if (req.query.issuerId) {
            //     issuers = issuers.filter(issuer => issuer._id == req.query.issuerId?.toString());
            // }

            let requestQuery = `?`;
            let queryCheck = 0;
            if (query.issuerId) {
                requestQuery += `issuerId=${query.issuerId}`;
                queryCheck = 1;
            }
            if (query.holderId) {
                // if (queryCheck) requestQuery += '&';
                requestQuery += `holderId=${query.holderId}`;
                queryCheck = 1;
            }
            if (query.schemaHash) {
                // if (queryCheck) requestQuery += '&';
                requestQuery += `schemaHash=${query.schemaHash}`;
                queryCheck = 1;
            }
            if (claimIds.length > 0) {
                claimIds.forEach(e => {
                    if (queryCheck) requestQuery += '&';
                    requestQuery += `claimId=${e}`;
                    queryCheck = 1;
                });
            }

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