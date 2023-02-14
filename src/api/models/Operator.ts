import { model, Schema } from 'mongoose';
import { OperatorRole, Portal } from '../../lib/constants';

export interface IOperator {
    _id?: string,
    userId: string,
    issuerId: string,
    role: string,
    claimId: string,
    activate: boolean,
    portal: Portal
}

const OperatorSchema = new Schema<IOperator>({
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    issuerId: { type: String, required: true },
    role: { type: String, required: true, enum: OperatorRole },
    claimId: { type: String, required: true },
    activate: { type: Boolean, required: true },
    portal: { type: String, required: true, enum: Portal }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
});

export default model<IOperator>('Operator', OperatorSchema);