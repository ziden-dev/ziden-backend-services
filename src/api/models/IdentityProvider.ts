import { model, Schema } from 'mongoose';

export interface IIdentityProvider {
    _id: String,            // uuid
    name: String,
    description: String,
    contact: String,
    website: String,
    logoUrl: String,
    issuers: String[]       // Ziden IDs
}

const IdentityProviderSchema = new Schema<IIdentityProvider>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    website: { type: String, required: true },
    logoUrl: { type: String, required: true },
    issuers: { type: [String], required: true },
}, {
    strict: true,
    timestamps: true
});

export default model<IIdentityProvider>('IdentityProvider', IdentityProviderSchema);