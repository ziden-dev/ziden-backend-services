import { v4 as uuidV4 } from 'uuid';

import ServiceProvider, { IServiceProvider } from '../models/ServiceProvider';

export class ServiceProviderService {

    constructor(){ }

    public async findOne(providerId: string): Promise<IServiceProvider | undefined> {
        return (await ServiceProvider.findById(providerId))?.toObject();
    }

    public async findAll(): Promise<IServiceProvider[]> {
        return (await ServiceProvider.find()).map(e => e.toObject());
    }

    public async save(provider: IServiceProvider): Promise<IServiceProvider> {
        if (!provider._id) Object.assign(provider, {_id:uuidV4()});
        
        return (await ServiceProvider.findByIdAndUpdate(
            provider._id,
            provider,
            {upsert: true, new: true}
        ))
    }

}