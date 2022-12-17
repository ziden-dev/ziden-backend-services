import { Request, Response } from "express";

import { VerifierService } from "../services/VerifierService.js";
import { IVerifier } from "../models/Verifier.js";
import { NotFoundError } from "../errors/http/NotFoundError.js";
import { BadRequestError } from "../errors/http/BadRequestError.js";
import logger from "../../lib/logger/index.js";

export class VerifierController {

    verifierService: VerifierService;
    
    constructor() {
        this.verifierService = new VerifierService();

        this.findAllVerifiers = this.findAllVerifiers.bind(this);
        this.findOneVerifier = this.findOneVerifier.bind(this);
        this.createVerifier = this.createVerifier.bind(this);
    }

    public async findAllVerifiers(req: Request, res: Response) {
        try {
            res.send({
                'verifiers': await this.verifierService.findAll()
            })
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findOneVerifier(req: Request, res: Response) {
        try {
            if (!req.params.verifierId) throw new BadRequestError('Missing verifierId in request param');
            const verifier = await this.verifierService.findOne(req.params.verifierId);
            if (verifier === undefined) throw new NotFoundError('Verifier is not registered');
            res.send({
                'verifier': verifier
            })
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async createVerifier(req: Request, res: Response) {
        try {
            if (!req.body.verifier) throw new BadRequestError('Missing verifier property in request body')
            res.send({
                'newVerifier': await this.verifierService.save(req.body.verifier as IVerifier)
            })
        } catch (error: any) {
            logger.error(error)
            res.status(error.httpCode ?? 500).send(error);
        }
    }
}