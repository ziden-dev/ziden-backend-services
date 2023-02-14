import { model, Schema } from 'mongoose';
import { PropertyType } from '../../lib/constants';

export interface IClaimProperty {
    slot: string,
    type: PropertyType
}

export interface ISchema {
    _id?: string,
    name: string,
    hash: string,
    accessUri: string,
    jsonSchema?: object
}

const ClaimPropertySchema = new Schema<IClaimProperty>({
    slot: { type: String, required: true },
    type: { type: String, required: true }
}, {
    strict: false,
    timestamps: false,
    _id: false
});

const SchemaSchema = new Schema<ISchema>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    hash: { type: String, required: true },
    accessUri: { type: String, required: true }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
});

export default model<ISchema>('Schema', SchemaSchema);