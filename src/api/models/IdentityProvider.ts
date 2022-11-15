import { model, Schema } from 'mongoose';

export interface IIdentityProvider {
    _id?: string,
    name: string,
    description: string,
    contact: string,
    website: string,
    logoUrl: string
}

const IdentityProviderSchema = new Schema<IIdentityProvider>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    website: { type: String, required: true },
    logoUrl: { type: String, required: true }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
});

export default model<IIdentityProvider>('IdentityProvider', IdentityProviderSchema);