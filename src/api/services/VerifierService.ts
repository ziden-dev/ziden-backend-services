import { Model } from "mongoose";
import { Inject, Service } from "typedi";

import { IVerifier } from "../models/Verifier";

@Service()
export class VerifierService {

    constructor(
        @Inject('Verifier') private Verifier: Model<IVerifier>
    ) { }

    public async findOne(issuerId: string): Promise<IVerifier | undefined> {
        return (await this.Verifier.findById(issuerId))?.toObject();
    }

    public async findAll(): Promise<IVerifier[]> {
        return (await this.Verifier.find()).map(e => e.toObject());
    }

    public async save(issuer: IVerifier): Promise<IVerifier> {
        return (await this.Verifier.findByIdAndUpdate(
            issuer._id,
            issuer,
            {upsert: true, new: true}
        )).toObject()
    }

}