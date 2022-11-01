import { Model } from "mongoose";
import { Inject, Service } from "typedi";

import { ISchema } from "../models/Schema";

@Service()
export class SchemaService {
    
    constructor(
        @Inject('Schema') private Schema: Model<ISchema>
    ) { }
    
    public async findOne(schemaHash: string): Promise<ISchema | undefined> {
        return (await this.Schema.findById(schemaHash))?.toObject();
    }

    public async findAll(): Promise<ISchema[]> {
        return (await this.Schema.find()).map(e => e.toObject());
    }

    public async save(schema: ISchema): Promise<ISchema> {
        schema._id = schema.schemaHash;
        return (await this.Schema.findByIdAndUpdate(
            schema._id,
            schema,
            {upsert: true, new: true}
        )).toObject();
    }
}