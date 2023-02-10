import Verifier, { IVerifier } from '../models/Verifier.js';

export class VerifierService {

    constructor() { }

    public async findOneById(issuerId: string): Promise<IVerifier | undefined> {
        return (await Verifier.findById(issuerId))?.toObject();
    }

    public async findAll(): Promise<IVerifier[]> {
        return (await Verifier.find()).map(e => e.toObject());
    }

    public async findByProvider(providerId: string): Promise<IVerifier[]> {
        return (await Verifier.find({ 'providerId': providerId })).map(e => e.toObject());
    }

    public async save(issuer: IVerifier): Promise<IVerifier> {
        return (await Verifier.findByIdAndUpdate(
            issuer._id,
            issuer,
            { upsert: true, new: true }
        )).toObject();
    }

    public async createVerifier(verifier: IVerifier): Promise<IVerifier | boolean> {
        if (await this.findOneById(verifier._id)) {
            return false;
        }
        return (await Verifier.create(verifier));
    }

}