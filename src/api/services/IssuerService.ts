import Issuer, { IIssuer } from "../models/Issuer";

export class IssuerService {

    constructor(){ }

    public async findOne(issuerId: string): Promise<IIssuer | undefined> {
        return (await Issuer.findById(issuerId))?.toObject();
    }

    public async findAll(): Promise<IIssuer[]> {
        return (await Issuer.find()).map(e => e.toObject());
    }

    public async findByProvider(providerId: string): Promise<IIssuer[]> {
        return (await Issuer.find({ providerId: providerId })).map(e => e.toObject());
    }

    public async save(issuer: IIssuer): Promise<IIssuer> {
        return (await Issuer.findByIdAndUpdate(
            issuer._id,
            issuer,
            {upsert: true, new: true}
        ))
    }

}