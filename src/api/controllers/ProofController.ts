import { BadRequestError, BaseDriver, Body, Delete, Get, JsonController, NotFoundError, OnUndefined, Param, Post, Put, QueryParam, QueryParams, Req, Res } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { IQuery } from "../models/Service";

import { RegistryService } from "../services/RegistryService";

export interface ProofRequest {
    verifierId: string,
    message: string,
    requirements: {
        schemaHash: string,
        circuitId: string,
        query: IQuery
    }[]
}

export interface Proof {

}

@JsonController('/proofs')
export class ProofController {

    constructor(
        private registryService: RegistryService
    ) { }

    @Get('/requests/:serviceId')
    public async getProofRequest(
        @Param('serviceId') serviceId: string
    ): Promise<ProofRequest> {
        let service = await this.registryService.findOneService(serviceId);
        if (!service) throw new BadRequestError();
        let request: ProofRequest = {
            verifierId: service._id,
            message: 'Sign this message to access Ziden service',
            requirements: service.requirements.map((req) => {
                return {
                    schemaHash: req.schemaHash,
                    circuitId: req.circuitId,
                    query: req.query
                }
            })
        };
        return request;
    }

    @Get('/public')
    public getProofPublicData(
        @QueryParam('claimId') claimId: string,
        @QueryParam('issuerId') issuerId: string
    ): any {}

    @Post('/submit')
    public submitProof(
        @Body() proof: Proof
    ): any {}

}