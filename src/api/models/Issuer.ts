import { model, Schema } from 'mongoose';

export interface IIssuer {
    _id?: string,                // Ziden ID
    providerId: string,
    endpointUrl: string,
    revocationTreeDb: string,
    rootsTreeDb: string
}

const IssuerSchema = new Schema<IIssuer>({
    _id: { type: String, required: true },
    endpointUrl: { type: String, required: true },
    revocationTreeDb: { type: String, required: true },
    rootsTreeDb: { type: String, required: true }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
})

export default model<IIssuer>('Issuer', IssuerSchema);