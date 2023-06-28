import { Request, Response } from 'express';

import { NetworkService } from '../services/NetworkService.js';
import logger from '../../lib/logger/index.js';
import { BadRequestError } from '../errors/http/BadRequestError.js';
import { NotFoundError } from '../errors/http/NotFoundError.js';
import { sendRes } from '../responses/index.js';

export class NetworkController {

    networkService: NetworkService;

    constructor() {
        this.networkService = new NetworkService();
        
        this.getAllSupportedNetworks = this.getAllSupportedNetworks.bind(this);
        this.findNetworkById = this.findNetworkById.bind(this);
    }

    public async getAllSupportedNetworks(req: Request, res: Response) {
        try {
            sendRes(res, null, { 'networks': await this.networkService.findAllNetworks() });
        } catch (error: any) {
            logger.error(error);
            sendRes(res, error);
        }
    }

    public async findNetworkById(req: Request, res: Response) {
        try {
            if (!req.params.chainId) throw new BadRequestError('Missing chainId in request params');
            const network = await this.networkService.findOneById(Number(req.params.chainId));
            if (network === undefined) throw new NotFoundError('Network is not supported');

            sendRes(res, null, { 'network': network });
        } catch (error: any) {
            logger.error(error);
            sendRes(res, error);
        }
    }
}