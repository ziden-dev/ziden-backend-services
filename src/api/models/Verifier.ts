import { model, Schema } from 'mongoose';

export interface IVerifier {
    _id: string,                // Ziden ID
    name: string,
    description: string,
    contact: string,
    isVerified?: boolean,
    website: string,
    logoUrl: string,
    endpointUrl?: string        // Not necessary, might be in the future
}

const VerifierSchema = new Schema<IVerifier>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    website: { type: String, required: true },
    logoUrl: { type: String, required: true },
    endpointUrl: { type: String }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
});

export default model<IVerifier>('Verifier', VerifierSchema);