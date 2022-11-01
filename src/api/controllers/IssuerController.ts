import { BadRequestError, Body, Delete, Get, JsonController, NotFoundError, OnUndefined, Param, Post, Put, Req, Res } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

import { IssuerService } from "../services/IssuerService";
import Issuer, { IIssuer } from "../models/Issuer";

@JsonController('/issuers')
export class IssuerController {

    constructor(
        private issuerService: IssuerService
    ) { }

    @Get('/')
    public findAllIssuers(): Promise<IIssuer[]> {
        return this.issuerService.findAll();
    }

    @Get('/:issuerId')
    public findOneIssuer(@Param('issuerId') issuerId: string): Promise<IIssuer | undefined> {
        return this.issuerService.findOne(issuerId);
    }

}