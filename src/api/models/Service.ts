import { model, Schema } from 'mongoose';
import { ZkCircuit, ZkOperator } from '../../lib/constants';

export interface IQuery {
    propertyName: string,
    operator: ZkOperator,
    value: number[]
}

export interface IRequirement {
    title: string,
    attestation: string,
    allowedIssuers: string[],
    schemaHash: string,
    circuitId: ZkCircuit,
    query: IQuery
}

export type IService = {
    _id?: string,
    name: string,
    description: string,
    networkId: string,
    requirements: IRequirement[],
    endpointUrl: string,
    active: boolean
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
    name: { type: String, required: true },
    description: { type: String, required: true },
    networkId: { type: String, required: true },
    requirements: { type: [RequirementSchema], required: true },
    endpointUrl: { type: String, required: true },
    active: { type: Boolean, required: true, default: true }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
})

export default model<IService>('Service', ServiceSchema);