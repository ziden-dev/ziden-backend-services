import { v4 as uuidV4 } from 'uuid';
import { schema as zidenSchema } from 'zidenjs';

import Schema, { ISchema } from '../models/Schema.js';
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
        if (!schema._id && !schema.schemaHash) {
            const schemaHash = zidenSchema.getSchemaHashFromSchema(schema);
            Object.assign(schema, {schemaHash: schemaHash});

            if (!schema._id || !(schema._id === schemaHash)) {
                Object.assign(schema, {_id: schemaHash});
            }
        }

        return (await Schema.findByIdAndUpdate(
            schema._id,
            schema,
            {upsert: true, new: true}
        )).toObject();
    }

    public async findSchemaContext(schemaHash: String): Promise<IContext | undefined> {
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
}