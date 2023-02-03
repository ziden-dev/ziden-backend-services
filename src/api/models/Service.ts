import { model, Schema } from 'mongoose';
import { OPERATOR } from 'zidenjs/build/witnesses/query';

export enum Circuit {
    QUERY_MTP = 'credentialAtomicQueryMTP',
    QUERY_SIG = 'credentialAtomicQuerySig',
    QUERY_MTP_RELAY = 'credentialAtomicQueryMTPWithRelay'
}

export interface IQuery {
    propertyName: string,
    operator: OPERATOR,
    value: number[]
}

export interface IRequirement {
    title: string,
    attestation: string,
    allowedIssuers: string[],
    schemaHash: string,
    circuitId: Circuit,
    query: IQuery
}

export type IService = {
    _id: string,
    title: string,
    verifierId: string,
    description: string,
    requirements: IRequirement[],
    active: boolean,
    network: string
}

const QuerySchema = new Schema<IQuery>({
    propertyName: { type: String, required: true },
    operator: { type: Number, required: true },
    value: { type: [Number], required: true }
}, {
    strict: true,
    timestamps: false,
    _id: false
});

const RequirementSchema = new Schema<IRequirement>({
    title: { type: String, required: true },
    attestation: { type: String, required: true },
    allowedIssuers: { type: [String], required: true },
    schemaHash: { type: String, required: true },
    circuitId: { type: String, required: true },
    query: { type: QuerySchema, required: true },
}, {
    strict: true,
    timestamps: false,
    _id: false
});

const ServiceSchema = new Schema<IService>({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    verifierId: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [RequirementSchema], required: true },
    active: { type: Boolean, required: true },
    network: { type: String, required: true }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
})

export default model<IService>('Service', ServiceSchema);