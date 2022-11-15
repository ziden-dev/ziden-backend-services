import { model, Schema } from 'mongoose';

export interface IVerifier {
    _id: string,
    providerId: string,
    endpointUrl: string
}

const VerifierSchema = new Schema<IVerifier>({
    _id: { type: String, required: true },
    providerId: { type: String, required: true },
    endpointUrl: { type: String, required: true }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
});

export default model<IVerifier>('Verifier', VerifierSchema);