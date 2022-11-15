import mongoose, { model, Schema } from 'mongoose';

export interface IClaimProperty {
    title: string,
    type: 'string' | 'integer' | 'double' | 'date' | 'datetime' | 'boolean'
}

export interface ISchema {
    _id?: string,
    schemaHash?: string,
    title: string,
    properties: {[key: string]: IClaimProperty}
    index: string[],
    value: string[],
    required: string[]
}

const ClaimPropertySchema = new Schema<IClaimProperty>({
    title: { type: String, required: true },
    type: { type: String, required: true }
}, {
    strict: false,
    timestamps: false,
    _id: false
});

const SchemaSchema = new Schema<ISchema>({
    _id: { type: String, required: true },
    schemaHash: { type: String, required: true },
    title: { type: String, required: true },
    properties: { type: Object, of: ClaimPropertySchema, required: true },
    index: { type: [String], required: true },
    value: { type: [String], required: true },
    required: { type: [String], required: true },
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
});

export default model<ISchema>('Schema', SchemaSchema);