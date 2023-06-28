import Verifier, { IVerifier } from '../models/Verifier.js';

export class VerifierService {

    constructor() { }

    public async findOneById(verifierId: string): Promise<IVerifier | undefined> {
        return (await Verifier.findById(verifierId))?.toObject();
    }

    public async findAll(): Promise<IVerifier[]> {
        return (await Verifier.find()).map(e => e.toObject());
    }

    public async findByProvider(providerId: string): Promise<IVerifier[]> {
        return (await Verifier.find({ 'providerId': providerId })).map(e => e.toObject());
    }

    public async save(verifier: IVerifier): Promise<IVerifier> {
        return (await Verifier.findByIdAndUpdate(
            verifier._id,
            verifier,
            { upsert: true, new: true }
        )).toObject();
    }

    public async createVerifier(verifier: IVerifier): Promise<IVerifier | boolean> {
        if (await this.findOneById(verifier._id)) {
            return false;
        }
        return (await Verifier.create(verifier));
    }

    public async deleteVerifier(verifierId: string) {
        await Verifier.findByIdAndRemove(verifierId);
    }

    public async findByQuery(query: any) {
        return (await Verifier.find(query)).map(e => e.toObject());
    }
}