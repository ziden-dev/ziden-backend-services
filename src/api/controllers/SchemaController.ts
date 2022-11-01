// import { Type } from "class-transformer";
import { Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Req, Res } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Inject, Service } from "typedi";

import { SchemaService } from "../services/SchemaService";
import { ISchema } from "../models/Schema";

export class SchemaResponse {
    public data: any
}

@JsonController('/schemas')
export class SchemaController {
    constructor(
        private schemaService: SchemaService
    ){}
    
    @Post('/')
    @ResponseSchema(SchemaResponse)
    public registerSchema(@Body() schema: ISchema): Promise<ISchema> {
        return this.schemaService.save(schema);
    }

    @Get('/')
    @ResponseSchema(SchemaResponse)
    public findAllSchemas(): Promise<ISchema[] | undefined> {
        return this.schemaService.findAll();
    }

    @Get('/:schemaHash')
    @ResponseSchema(SchemaResponse)
    public fineOne(@Param('schemaHash') schemaHash: string): Promise<ISchema | undefined> {
        return this.schemaService.findOne(schemaHash);
    }
}