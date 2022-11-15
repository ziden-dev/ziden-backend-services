import { v4 as uuidV4 } from 'uuid';

import Schema, { ISchema } from '../models/Schema';
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
        if (!schema.schemaHash) {
            // const schemaHash = hashSchema(schema); //FIXME
            const schemaHash = '34026444997966407455173871616257787521361155617631575393219926927966991955994';//FIXME
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
}