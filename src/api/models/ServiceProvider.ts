import { model, Schema } from 'mongoose'

export interface IServiceProvider {
    _id?: string,            // uuid
    name: string,
    description: string,
    contact: string,
    website: string,
    logoUrl: string
}

const ServiceProviderSchema = new Schema<IServiceProvider>({
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

export default model<IServiceProvider>('ServiceProvider', ServiceProviderSchema);