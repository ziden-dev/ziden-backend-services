import { v4 as uuidV4 } from 'uuid'; 

import Service, { IService } from '../models/Service.js';

export class ServiceService {

    constructor() {
        this.findOneById = this.findOneById.bind(this);
    }

    public async findOneById(serviceId: string): Promise<IService | undefined> {
        return (await Service.findById(serviceId))?.toObject();
    }

    public async findAll(query: any): Promise<IService[]> {
        return (await Service.find(query)).map(e => e.toObject());
    }

    public async findManyByVerifier(verifierId: string): Promise<IService[]> {
        return (await Service.find({
            verifierId: verifierId
        })).map(e => e.toObject());
    }

    public async createService(service: IService): Promise<IService | boolean> {
        if (await this.findOneById(service?._id ?? '')) {
            return false;
        }
        if (!service._id) Object.assign(service, {_id: uuidV4()});
        return await Service.create(service);
    }

    public async updateService(service: IService): Promise<IService | boolean> {
        if (await this.findOneById(service?._id ?? '')) {
            return (await Service.findByIdAndUpdate(
                service._id,
                service,
                {upsert: true, new: true}
            )).toObject();
        }
        
        return false;
    }
}