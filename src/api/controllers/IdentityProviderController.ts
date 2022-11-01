import { BadRequestError, Body, Delete, Get, JsonController, NotFoundError, OnUndefined, Param, Post, Put, Req, Res } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

@JsonController('/identityProviders')
export class IdentityProviderController {

    constructor(

    ) { }

    @Post('/')
    public registerIdentityProvider(@Body() provider: any): any {}

    @Get('/')
    public findAllProviders(): any {}

    @Get('/:providerId')
    public findOneProvider(@Param('providerId') providerId: string): any {}

    @Get('/:providerId/schemas')
    public findAllSchemasOfProvider(@Param('providerId') providerId: string): any {}

    @Get('/:providerId/issuers')
    public findAllIssuersOfProvider(@Param('providerId') providerId: string): any {}

    @Get('/:providerId/issuers/:issuerId')
    public findOneIssuerOfProvider(@Param('providerId') providerId: string, @Param('issuerId') issuerId: string): any {}

}