import { model, Schema } from 'mongoose';

import { KYCQueryMTPInput, KYCNonRevQueryMTPInput, KYCQuerySigInput, KYCNonRevQuerySigInput } from "@zidendev/zidenjs";

export interface IProofRequest {
    _id?: string
    serviceId: string
    message: string
    proofs?: IProof[]
    validUntil?: Date
}

export interface IProofData {
    mtpInput?: KYCQueryMTPInput,
    nonRevMtpInput?: KYCNonRevQueryMTPInput
    sigInput?: KYCQuerySigInput,
    nonRevSigInput?: KYCNonRevQuerySigInput
}

export interface IProof {
    proof: any
    publicData: any
}

const ProofSchema = new Schema<IProof>({
    proof: { type: Object, required: true },
    publicData: { type: Object, required: true }
}, {
    strict: true,
    timestamps: false,
    _id: false
});

const ProofRequestSchema = new Schema<IProofRequest>({
    _id: { type: String, required: true },
    serviceId: { type: String, required: true },
    message: { type: String, required: true },
    proofs: { type: [ProofSchema], required: true, default: [] },
    validUntil: { type: Date, required: true }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
});

// ProofRequestSchema.virtual('requestId').get(function() {
//     return this?._id.slice(this._id.indexOf('@') + 1);
// });

export default model<IProofRequest>('ProofRequest', ProofRequestSchema);