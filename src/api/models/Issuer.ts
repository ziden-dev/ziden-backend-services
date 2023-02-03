import { model, Schema } from 'mongoose';

export interface IIssuer {
    _id?: string,                // Ziden ID
    providerId: string,
    endpointUrl: string,
    supportedNetworks: string[]
}

const IssuerSchema = new Schema<IIssuer>({
    _id: { type: String, required: true },
    providerId: { type: String, required: true },
    endpointUrl: { type: String, required: true },
    supportedNetworks: { type: [String], required: true }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
})

export default model<IIssuer>('Issuer', IssuerSchema);