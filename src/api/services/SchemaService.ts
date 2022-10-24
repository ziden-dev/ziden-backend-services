import { Model } from "mongoose";
import { Inject, Service } from "typedi";

import { ISchema } from "../models/Schema";

@Service()
export class SchemaService {
    
    constructor (
        @Inject('Schema') private Schema: Model<ISchema>
    ) { }
    
    public async findOne(schemaHash: string) : Promise<ISchema | undefined> {
        return (await this.Schema.findById(schemaHash))?.toObject();
    }
}