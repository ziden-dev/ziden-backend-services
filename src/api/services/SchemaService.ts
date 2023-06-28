import Schema, { ISchema } from '../models/Schema.js';
import { PropertyType } from '../../lib/constants/index.js';

export class SchemaService {
    
    constructor() {
        this.findOneById = this.findOneById.bind(this);
    }
    
    public async findOneById(schemaHash: string): Promise<ISchema | undefined> {
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

    public async createSchema(schema: ISchema): Promise<ISchema | boolean> {
        schema._id = schema.hash;
        if (await this.findOneById(schema._id)) {
            return false;
        }
        return (await Schema.create(schema));
    }

    public async updateIssuer(schema: ISchema): Promise<ISchema | boolean> {
        if (await this.findOneById(schema?._id ?? '')) {
            return (await Schema.findByIdAndUpdate(
                schema._id,
                schema,
                {upsert: true, new: true}
            ));
        }
        return false;
    }

    public getSupportedDataTypes(): string[] {
        return Object.values(PropertyType);
    }
}