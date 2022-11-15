import { Request, Response } from "express";

import { IssuerService } from "../services/IssuerService";
import logger from "../../lib/logger";
import { NotFoundError } from "../errors/http/NotFoundError";

export class IssuerController {
    
    issuerService: IssuerService;

    constructor() {
        this.issuerService = new IssuerService();
        
        this.findAllIssuers = this.findAllIssuers.bind(this);
        this.findOneIssuer = this.findOneIssuer.bind(this);
        this.createIssuer = this.createIssuer.bind(this);
    }

    public async findAllIssuers(req: Request, res: Response) {
        try {
            res.send({
                'issuers': await this.issuerService.findAll()
            });
        } catch(error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findOneIssuer(req: Request, res: Response) {
        try {
            const issuer = await this.issuerService.findOne(req.params.issuerId);
            if (issuer === undefined) throw new NotFoundError("Issuer is not registered");
            res.send({
                'issuer': issuer
            });
        } catch(error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async createIssuer(req: Request, res: Response) {
        try {
            res.send({
                'newIssuer': await this.issuerService.save(req.body.issuer)
            });
        } catch (error: any) {
            logger.error(error);
            res.status(error.httpCode ?? 500).send(error);
        }
    }

}