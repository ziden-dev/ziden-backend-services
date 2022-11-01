import { Model } from "mongoose";
import { Inject, Service } from "typedi";

import { IIssuer } from "../models/Issuer";

@Service()
export class IssuerService {

    constructor(
        @Inject('Issuer') private Issuer: Model<IIssuer>
    ) { }

    public async findOne(issuerId: string): Promise<IIssuer | undefined> {
        return (await this.Issuer.findById(issuerId))?.toObject();
    }

    public async findAll(): Promise<IIssuer[]> {
        return (await this.Issuer.find()).map(e => e.toObject());
    }

    public async save(issuer: IIssuer): Promise<IIssuer> {
        return (await this.Issuer.findByIdAndUpdate(
            issuer._id,
            issuer,
            {upsert: true, new: true}
        )).toObject()
    }

}