import { model, Schema } from "mongoose";

export interface IClaimProperty {
    propertyName: string,
    propertyType: 'number' | 'string',
    displayName: string,
    slot: 0 | 1,
    begin: number,
    end: number
}

export interface IClaimProperties {
    index: IClaimProperty[],
    value: IClaimProperty[]
}

export interface ISchema {
    _id?: string,
    schemaHash?: string,
    name: string,
    properties: IClaimProperties
}

const ClaimPropertySchema = new Schema<IClaimProperty>({
    propertyName: { type: String, required: true },
    propertyType: { type: String, required: true },
    displayName: { type: String, required: true },
    slot: { type: Number, required: true},
    begin: { type: Number, required: true },
    end: { type: Number, required: true },   
}, {
    strict: true,
    timestamps: false,
    _id: false
});

const ClaimPropertiesSchema = new Schema<IClaimProperties>({
    index: { type: [ClaimPropertySchema], required: true },
    value: { type: [ClaimPropertySchema], required: true }
}, {
    strict: true,
    timestamps: false,
    _id: false
});

const SchemaSchema = new Schema<ISchema>({
    _id: { type: String, required: true },
    schemaHash: { type: String, required: true },
    name: { type: String, required: true },
    properties: { type: ClaimPropertiesSchema, required: true }
}, {
    strict: true,
    timestamps: true
});

export default model<ISchema>('Schema', SchemaSchema);