import { model, Schema } from 'mongoose';

export interface INetwork {
    _id?: string,
    chainId: string,
    name: string,
    shortName: string
}

const NetworkSchema = new Schema<INetwork>({
    _id: { type: String, required: true },
    chainId: { type: String, required: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true }
}, {
    strict: false,
    strictQuery: false,
    timestamps: true
});

export default model<INetwork>('Network', NetworkSchema);