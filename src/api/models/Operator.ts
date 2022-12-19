import { model, Schema } from 'mongoose';

export interface IOperator {
    _id: String,
    holderId: String,
    issuerId: String
}

const OperatorSchema = new Schema<IOperator>({
    _id: { type: String, required: true },
    holderId: { type: String, required: true },
    issuerId: { type: String, required: true }
}, {
    strict: false,
    strictQuery: false,
    timestamps: true
});

export default model<IOperator>('Operator', OperatorSchema);