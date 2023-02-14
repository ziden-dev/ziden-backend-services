import { model, Schema } from 'mongoose';

export interface ISchemaRegistry {
    _id: string,
    schemaHash: string,
    issuerId: string,
    description: string,
    expiration: number,
    updatable: boolean,
    networkId: string,
    endpointUrl: string,
    active: boolean

}

// const SchemaRegistrySchema = new Schema<ISchemaRegistry>({
//     _id: { type: String, required: true },
//     schemaHash: { type: String, required: true },
//     issuerId: { type: String, required: true },
//     description: { type: String, required: true },
//     expiration: { type: Number, required: true },
//     updatable: { type: Boolean, required: true },
//     networkId: { type: String, required: true },
//     endpointUrl: { type: String, required: true },
//     active: { type: Boolean, required: true, default: true }
// }, {
//     strict: true,
//     strictQuery: false,
//     timestamps: true
// });

// export default model<ISchemaRegistry>('SchemaRegistry', SchemaRegistrySchema);