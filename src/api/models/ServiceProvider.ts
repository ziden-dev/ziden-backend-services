import { model, Schema } from "mongoose";

export interface IServiceProvider {
    _id: String,            // uuid
    name: String,
    description: String,
    contact: String,
    website: String,
    logoUrl: String,
    verifiers: String[]     // Ziden IDs
}

const ServiceProviderSchema = new Schema<IServiceProvider>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    website: { type: String, required: true },
    logoUrl: { type: String, required: true },
    verifiers: { type: [String], required: true },
})