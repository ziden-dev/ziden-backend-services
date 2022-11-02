import { BadRequestError, BaseDriver, Body, Delete, Get, JsonController, NotFoundError, OnUndefined, Param, Post, Put, QueryParam, QueryParams, Req, Res } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import axios from 'axios';

import { KYCQueryMTPInput, KYCNonRevQueryMTPInput } from "zidenjs/build/witnesses/queryMTP";
import { KYCQuerySigInput, KYCQuerySigNonRevInput } from "zidenjs/build/witnesses/querySig";
import { IQuery } from "../models/Service";
import { RegistryService } from "../services/RegistryService";
import { IssuerService } from "../services/IssuerService";
import { ProofService } from "../services/ProofService";

export interface ProofRequest {
    verifierId: string,
    message: string,
    requirements: {
        schemaHash: string,
        circuitId: string,
        query: IQuery
    }[]
}

export interface ProofData {
    mtpInput?: KYCQueryMTPInput,
    nonRevMtpInput?: KYCNonRevQueryMTPInput
    sigInput?: KYCQuerySigInput,
    nonRevSigInput?: KYCQuerySigNonRevInput
}

export interface Proof {
    proof: any,
    publicSignals: any
}

@JsonController('/proofs')
export class ProofController {

    constructor(
        private registryService: RegistryService,
        private issuerService: IssuerService,
        private proofService: ProofService
    ) { }

    @Get('/requests/:serviceId')
    public async getProofRequest(
        @Param('serviceId') serviceId: string
    ): Promise<ProofRequest> {
        let service = await this.registryService.findOneService(serviceId);
        if (!service) throw new BadRequestError();
        let request: ProofRequest = {
            verifierId: service.verifierId,
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
    public async getProofPublicData(
        @QueryParam('claimId') claimId: string,
        @QueryParam('issuerId') issuerId: string
    ): Promise<ProofData> {
        let issuer = await this.issuerService.findOne(issuerId);
        if(!issuer || !issuer.endpointUrl) throw new NotFoundError();
        return (await axios.get(`${issuer.endpointUrl}/claims/${claimId}/proof`, {params: {type: 'nonRevMtp'}})).data;
    }

    @Post('/submit')
    public async submitProof(
        @Body() zkProof: Proof
    ): Promise<any> {
        if (!zkProof.proof || !zkProof.publicSignals) throw new BadRequestError();
        return this.proofService.verifyProof(zkProof.proof, zkProof.publicSignals);
    }

}