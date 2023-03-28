import Issuer, { IIssuer } from '../models/Issuer.js';

export class IssuerService {

    constructor() {
        this.findOneById = this.findOneById.bind(this);
        this.findManyByIds = this.findManyByIds.bind(this);
        this.createIssuer = this.createIssuer.bind(this);
        this.updateIssuer = this.updateIssuer.bind(this);
    }

    public async findOneById(issuerId: string): Promise<IIssuer | undefined> {
        return (await Issuer.findById(issuerId))?.toObject();
    }

    public async findAll(): Promise<IIssuer[]> {
        return (await Issuer.find()).map(e => e.toObject());
    }

    public async findManyByIds(issuerIds: string[]): Promise<IIssuer[]> {
        return (await Issuer.find({
            _id: { $in: issuerIds }
        })).map(e => e.toObject());
    }

    public async createIssuer(issuer: IIssuer): Promise<IIssuer | boolean> {
        if (await this.findOneById(issuer._id)) {
            return false;
        }
        return (await Issuer.create(issuer));
    }

    public async updateIssuer(issuer: IIssuer): Promise<IIssuer | boolean> {
        if (await this.findOneById(issuer._id)) {
            return (await Issuer.findByIdAndUpdate(
                issuer._id,
                issuer,
                {upsert: true, new: true}
            ));
        }
        return false;
    }

}