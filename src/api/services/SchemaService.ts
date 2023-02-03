import { v4 as uuidV4 } from 'uuid';
import { schema as zidenSchema } from 'zidenjs';

import Schema, { ISchema, PropertyTypes } from '../models/Schema.js';
import Context, { IContext } from '../models/Context.js';


// import { hashSchema } from '../../utils';

export class SchemaService {
    
    constructor() { }
    
    public async findOne(schemaHash: string): Promise<ISchema | undefined> {
        return (await Schema.findById(schemaHash))?.toObject();
    }

    public async findAll(): Promise<ISchema[]> {
        return (await Schema.find()).map(e => e.toObject());
    }

    public async findMany(schemaHashes: string[]): Promise<ISchema[]> {
        return (await Schema.find({
            _id: { $in: schemaHashes }
        })).map(e => e.toObject());
    }

    public async save(schema: ISchema): Promise<ISchema> {
        const schemaHash = this.hashSchema(schema);
        Object.assign(schema, {
            _id: schemaHash,
            schemaHash: schemaHash
        });

        return (await Schema.findByIdAndUpdate(
            schema._id,
            schema,
            {upsert: true, new: true}
        )).toObject();
    }

    public hashSchema(schema: ISchema): string {
        const cleanSchema: ISchema = {
            'title': schema.title,
            'properties': schema.properties,
            'index': schema.index,
            'value': schema.value,
            'required': schema.required
        };
        
        return zidenSchema.getSchemaHashFromSchema(cleanSchema);
    }

    public async findSchemaContext(schemaHash: string): Promise<IContext | undefined> {
        return (await Context.findById(schemaHash))?.toObject();
    }

    public async saveContext(context: IContext): Promise<IContext> {
        context._id = context.schemaHash;

        return (await Context.findByIdAndUpdate(
            context._id,
            context,
            {upsert: true, new: true}
        )).toObject();
    }

    public getSupportedDataTypes(): string[] {
        return Object.values(PropertyTypes);
    }
}