import { Request, Response } from "express";

import { SUPPORTED_NETWORKS } from "../../static/supportedNetworks.js";
import { HttpError } from "../errors/http/HttpError.js";
import { NotFoundError } from "../errors/http/NotFoundError.js";
import logger from "../../lib/logger/index.js";

export class StaticController {

    constructor() { }

    public async getSupportedNetworks(req: Request, res: Response) {
        res.send({ 'networks': SUPPORTED_NETWORKS });
    }

    public async getSupportedNetworkByChainId(req: Request, res: Response) {
        try {
            const network = SUPPORTED_NETWORKS.filter(e => e.chainId.toString() == req.params.chainId);
            if (network.length == 0) throw new NotFoundError('Network not found');
            res.send({ 'network': network });
        } catch (error: any) {
            logger.error(error);
            res.status(error.httpCode ?? 500).send(error);
        }
    }

}