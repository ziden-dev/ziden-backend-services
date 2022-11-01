import { Model } from "mongoose";
import { Inject, Service } from "typedi";

import { ISchemaRegistry } from "../models/SchemaRegistry";
import { IService } from "../models/Service";

@Service()
export class RegistryService {

    constructor(
        @Inject('SchemaRegistry') private SchemaRegistry: Model<ISchemaRegistry>,
        @Inject('Service') private Service: Model<IService>
    ) { }

    public async findOneSchema(registryId: string): Promise<ISchemaRegistry | undefined> {
        return (await this.SchemaRegistry.findById(registryId))?.toObject();
    }

    public async save(registry: ISchemaRegistry): Promise<ISchemaRegistry> {
        registry._id = `${registry.schemaHash}-${registry.issuerId}`
        return (await this.SchemaRegistry.findByIdAndUpdate(
            registry._id,
            registry,
            {upsert: true, new: true}
        )).toObject()
    }

    public async findOneService(serviceId: string): Promise<IService | undefined> {
        return (await this.Service.findById(serviceId))?.toObject();
    }
}