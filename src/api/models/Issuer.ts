import { model, Schema } from 'mongoose';

export interface IIssuer {
    _id: string,                // Ziden ID
    name: string,
    description: string,
    contact: string,
    isVerified?: boolean,
    website: string,
    logoUrl: string
    endpointUrl: string,
    supportedNetworks?: string[]
}

const IssuerSchema = new Schema<IIssuer>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    website: { type: String, required: true },
    logoUrl: { type: String, required: true },
    endpointUrl: { type: String, required: true }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
});

export default model<IIssuer>('Issuer', IssuerSchema);