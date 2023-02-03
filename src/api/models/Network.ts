import { model, Schema } from 'mongoose';

export interface INetwork {
    _id?: string,
    chainId: string,
    name: string,
    shortName: string,
    contractAddresses: {[key: string]: string}
}

const NetworkSchema = new Schema<INetwork>({
    _id: { type: String, required: true },
    chainId: { type: String, required: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    contractAddresses: { type: Object, of: String, required: false }
}, {
    strict: false,
    strictQuery: false,
    timestamps: true
});

export default model<INetwork>('Network', NetworkSchema);