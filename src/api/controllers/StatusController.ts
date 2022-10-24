// import { Type } from "class-transformer";
import { Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Req, Res } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";

export class StatusResponse {
    public status?: string;
}

@JsonController('/status')
export class StatusController {
    constructor(){}

    @Get('')
    @ResponseSchema(StatusResponse)
    public status(): StatusResponse {
        return {
            status: 'Services are online and available'
        }
    }
}