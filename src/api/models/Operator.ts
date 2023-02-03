import { model, Schema } from 'mongoose';

export enum Platform {
    ISSUER = 'issuer',
    VERIFIER = 'verifier'
}

export interface IOperator {
    _id: String,
    operatorId: String,
    adminId: String,
    platform: Platform
}

const OperatorSchema = new Schema<IOperator>({
    _id: { type: String, required: true },
    operatorId: { type: String, required: true },
    adminId: { type: String, required: true },
    platform: { type: String, required: true, enum: Platform }
}, {
    strict: false,
    strictQuery: false,
    timestamps: true
});

export default model<IOperator>('Operator', OperatorSchema);