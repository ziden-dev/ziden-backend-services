import { model, Schema } from 'mongoose';

export interface IVerifier {
    _id: String,
    endpointUrl: String,
    services: String[]
}

const VerifierSchema = new Schema<IVerifier>({
    _id: { type: String, required: true },
    endpointUrl: { type: String, required: true },
    services: { type: [String], required: true },
});

export default model<IVerifier>('Verifier', VerifierSchema);