import { v4 as uuidV4 } from 'uuid';

import IdentityProvider, { IIdentityProvider } from "../models/IdentityProvider";

export class IdentityProviderService {

    constructor(){ }

    public async findOne(providerId: string): Promise<IIdentityProvider | undefined> {
        return (await IdentityProvider.findById(providerId))?.toObject();
    }

    public async findAll(): Promise<IIdentityProvider[]> {
        return (await IdentityProvider.find()).map(e => e.toObject());
    }

    public async save(provider: IIdentityProvider): Promise<IIdentityProvider> {
        if (!provider._id) Object.assign(provider, {_id:uuidV4()});
        
        return (await IdentityProvider.findByIdAndUpdate(
            provider._id,
            provider,
            {upsert: true, new: true}
        ))
    }

}