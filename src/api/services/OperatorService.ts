import { v4 } from "uuid";
import Operator, { IOperator, Platform } from "../models/Operator.js";

export class OperatorService {

    constructor() {}

    private async findOneOperator(operatorId: string, adminId: string, platform: string): Promise<IOperator[]> {
        return (await Operator.find({
            operatorId: operatorId,
            adminId: adminId,
            platform: platform
        })).map(e => e.toObject());
    }

    private async addOperator(operatorId: string, adminId: string, platform: Platform): Promise<IOperator> {
        const operator: IOperator = {
            _id: v4(),
            operatorId: operatorId,
            adminId: adminId,
            platform: platform
        }
        return (await Operator.create(operator))?.toObject();
    }

    public async findByIssuer(issuerId: string): Promise<IOperator[]> {
        return (await Operator.find({ 
            adminId: issuerId,
            platform: Platform.ISSUER
        })).map(e => e.toObject());
    }

    public async findByVerifier(verifierId: string): Promise<IOperator[]> {
        return (await Operator.find({ 
            adminId: verifierId,
            platform: Platform.VERIFIER
        })).map(e => e.toObject());
    }

    public async addOperatorByIssuer(operatorId: string, issuerId: string): Promise<IOperator | undefined> {
        if ((await this.findOneOperator(operatorId, issuerId, Platform.ISSUER)).length > 0)
            return undefined;

        return await this.addOperator(operatorId, issuerId, Platform.ISSUER);
    }

    public async removeOperatorByIssuer(operatorId: string, issuerId: string): Promise<IOperator | undefined> {
        const operator = (await this.findOneOperator(operatorId, issuerId, Platform.ISSUER))[0] ?? undefined;
        
        if (operator) await Operator.deleteOne({ _id: operator._id});
        return operator;
    }

    public async addOperatorByVerifier(operatorId: string, verifierId: string): Promise<IOperator | undefined> {
        if ((await this.findOneOperator(operatorId, verifierId, Platform.VERIFIER)).length > 0)
            return undefined;

        return await this.addOperator(operatorId, verifierId, Platform.VERIFIER);
    }

    public async removeOperatorByVerifier(operatorId: string, verifierId: string): Promise<IOperator | undefined> {
        const operator = (await this.findOneOperator(operatorId, verifierId, Platform.VERIFIER))[0] ?? undefined;
        
        if (operator) await Operator.deleteOne({ _id: operator._id});
        return operator;
    }

}