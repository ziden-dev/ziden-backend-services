import { BadRequestError, Body, BodyParam, Delete, Get, JsonController, NotFoundError, OnUndefined, Param, Post, Put, Req, Res } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

import { SchemaResponse } from "./SchemaController";
import { SchemaService } from "../services/SchemaService";
import { RegistryService } from "../services/RegistryService";
import { ISchema } from "../models/Schema";
import { ISchemaRegistry } from "../models/SchemaRegistry";
import { IService } from "../models/Service";

export class SchemaRegistryResponse {
    public data: any;
}

@JsonController('/registries')
export class RegistryController {

    constructor(
        private schemaService: SchemaService,
        private registryService: RegistryService
    ) { }

    private resolveRegistryId(registryId: string): any {
        let resolved = registryId.split('-');
        if (resolved.length != 2) throw new BadRequestError('Incorrect registry ID');
        return {
            schemaHash: resolved[0],
            issuerId: resolved[1]
        }
    }

    @Post('/schemas')
    public async registerSchema(
        @BodyParam('registry', {required: true}) registry: ISchemaRegistry,
        @BodyParam('schema', {required: false}) schema: ISchema
    ): Promise<{ 
        schema: ISchema,
        registry: ISchemaRegistry
    }> {
        if (!registry.schemaHash && schema) {
            let newSchema = await this.schemaService.save(schema);
            let newRegistry = await this.registryService.save(registry);
            return Promise.resolve({
                schema: newSchema,
                registry: newRegistry
            })
        } else {
            let existedSchema = await this.schemaService.findOne(registry.schemaHash);
            if (existedSchema === undefined) throw new NotFoundError();
            return Promise.resolve({
                schema: existedSchema,
                registry: await this.registryService.save(registry)
            })
        }
    }
    
    @Get('/schemas')
    public findAllSchemas(): Promise<ISchema[]> {
        return this.schemaService.findAll();
    }

    @Get('/schemas/:registryId')
    public async findOneSchema(@Param('registryId') registryId: string): Promise<{ 
        registry: ISchemaRegistry | undefined,
        schema: ISchema | undefined
    }> {
        return Promise.resolve({
            registry: await this.registryService.findOneSchema(registryId),
            schema: await this.schemaService.findOne(this.resolveRegistryId(registryId).schemaHash)
        })
    }

    @Put('/schemas/:registryId')
    public updateSchema(registry: ISchemaRegistry): any {

    }


    @Get('/services')
    public findAllServices(): any {

    }

    @Get('/services/:serviceId')
    public findOneService(@Param('serviceId') serviceId: string): Promise<IService | undefined> {
        return this.registryService.findOneService(serviceId);
    }

    @Put('/services/:serviceId')
    public updateService(service: IService): any {
        
    }
}