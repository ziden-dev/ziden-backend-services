import { v4 as uuidV4 } from 'uuid'; 

import SchemaRegistry, { ISchemaRegistry } from '../models/SchemaRegistry.js';
import Service, { IService } from '../models/Service.js';

export class RegistryService {

    constructor() { }

    public async findOneSchemaRegistry(registryId: string): Promise<ISchemaRegistry | undefined> {
        return (await SchemaRegistry.findById(registryId))?.toObject();
    }

    public async findAllSchemaRegistries(): Promise<ISchemaRegistry[]> {
        return (await SchemaRegistry.find()).map(e => e.toObject());
    }

    public async findSchemaRegistriesByIssuers(issuerIds: string[]): Promise<ISchemaRegistry[]> {
        return (await SchemaRegistry.find({
            issuerId: { $in: issuerIds }
        })).map(e => e.toObject());
    }

    public async findBySchemaAndIssuer(schemaHash: string, issuerId: string): Promise<ISchemaRegistry | undefined> {
        return (await SchemaRegistry.findOne({
            schemaHash: schemaHash,
            issuerId: issuerId
        }))?.toObject();
    }

    public async saveSchemaRegistry(registry: ISchemaRegistry): Promise<ISchemaRegistry> {
        if (!registry._id) Object.assign(registry, {_id: uuidV4()});

        return (await SchemaRegistry.findByIdAndUpdate(
            registry._id,
            registry,
            {upsert: true, new: true}
        )).toObject();
    }

    public async findOneService(serviceId: string): Promise<IService | undefined> {
        return (await Service.findById(serviceId))?.toObject();
    }

    public async findAllServices(): Promise<IService[]> {
        return (await Service.find()).map(e => e.toObject());
    }

    public async findServicesByVerifiers(verifierIds: string[]): Promise<IService[]> {
        return (await Service.find({
            verifierId: { $in: verifierIds }
        })).map(e => e.toObject());
    }

    public async saveService(service: IService): Promise<IService> {
        if (!service._id) Object.assign(service, {_id: uuidV4()});
        
        return (await Service.findByIdAndUpdate(
            service._id,
            service,
            {upsert: true, new: true}
        )).toObject();
    }
}