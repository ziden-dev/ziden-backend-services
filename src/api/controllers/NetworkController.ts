import { Request, Response } from 'express';

import { NetworkService } from '../services/NetworkService.js';
import logger from '../../lib/logger/index.js';
import { BadRequestError } from '../errors/http/BadRequestError.js';
import { NotFoundError } from '../errors/http/NotFoundError.js';

export class NetworkController {

    networkService: NetworkService;

    constructor() {
        this.networkService = new NetworkService();
        
        this.getAllSupportedNetworks = this.getAllSupportedNetworks.bind(this);
        this.findNetworkById = this.findNetworkById.bind(this);
        this.registerNetwork = this.registerNetwork.bind(this);
    }

    public async getAllSupportedNetworks(req: Request, res: Response) {
        try {
            res.send({ 'networks': await this.networkService.findAllNetworks() });
        } catch (error: any) {
            logger.error(error);
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findNetworkById(req: Request, res: Response) {
        try {
            if (!req.params.chainId) throw new BadRequestError('Missing chainId in request params');
            const network = await this.networkService.findNetworkById(req.params.chainId);
            if (network === undefined) throw new NotFoundError('Network is not supported');

            res.send({ 'network': network });
        } catch (error: any) {
            logger.error(error);
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async registerNetwork(req: Request, res: Response) {
        try {
            if (!req.body.network) throw new BadRequestError('Missing network in request body');
            const network = await this.networkService.saveNetwork(req.body.network);
            res.send({ 'network': network });
        } catch (error: any) {
            logger.error(error);
            res.status(error.httpCode ?? 500).send(error);
        }
    }

}