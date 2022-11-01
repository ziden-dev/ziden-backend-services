import { BadRequestError, Body, Delete, Get, JsonController, NotFoundError, OnUndefined, Param, Post, Put, Req, Res } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

@JsonController('serviceProviders')
export class ServiceProviderController {

    constructor(

    ) {}

    @Post('/')
    public registerServiceProvider(@Body() provider: any): any {}

    @Get('/')
    public findAllProviders(): any {}

    @Get('/:providerId')
    public findOneProvider(@Param('providerId') providerId: string): any {}

    @Get('/:providerId/services')
    public findAllServicesOfProvider(@Param('providerId') providerId: string): any {}

    @Get('/:providerId/verifiers')
    public findAllVerifiersOfProvider(@Param('providerId') providerId: string): any {}

    @Get('/:providerId/verifiers/:verifierId')
    public findOneVerifierOfProvider(@Param('providerId') providerId: string, @Param('verifierId') verifierId: string): any {}

}