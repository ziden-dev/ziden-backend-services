import { BadRequestError, Body, Delete, Get, JsonController, NotFoundError, OnUndefined, Param, Post, Put, Req, Res } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

import { VerifierService } from "../services/VerifierService";
import { IVerifier } from "../models/Verifier";

@JsonController('/verifiers')
export class VerifierController {

    constructor(
        private verifierService: VerifierService
    ) { }

    @Get('/')
    public findAllIssuers(): Promise<IVerifier[]> {
        return this.verifierService.findAll();
    }

    @Get('/:verifierId')
    public findOneIssuer(@Param('verifierId') verifierId: string): Promise<IVerifier | undefined> {
        return this.verifierService.findOne(verifierId);
    }

}