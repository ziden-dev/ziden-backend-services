import { model, Schema } from 'mongoose';

export interface IIssuer {
    _id: String,            // Ziden ID
    endpointUrl: String,
    revocationTreeDb: String,
    rootsTreeDb: String
}

const IssuerSchema = new Schema<IIssuer>({
    _id: { type: String, required: true },
    endpointUrl: { type: String, required: true },
    revocationTreeDb: { type: String, required: true },
    rootsTreeDb: { type: String, required: true }
},{
    strict: true,
    timestamps: true
})

export default model<IIssuer>('Issuer', IssuerSchema);