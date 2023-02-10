import { v4 } from "uuid";
import Operator, { IOperator } from "../models/Operator.js";
import { Portal } from "../../lib/constants/index.js";
import { claim } from "zidenjs";
export class OperatorService {

    constructor() { }

    // private async findOneOperator(operatorId: string, adminId: string, platform: string): Promise<IOperator[]> {
    //     return (await Operator.find({
    //         operatorId: operatorId,
    //         adminId: adminId,
    //         platform: platform
    //     })).map(e => e.toObject());
    // }

    public async createOperator(operator: IOperator): Promise<IOperator> {
        const lastOperator = await Operator.findOne({ userId: operator.userId, issuerId: operator.issuerId });
        if (lastOperator) {
            Object.assign(lastOperator, operator);
            await lastOperator.save();
            return lastOperator.toObject();
        }
        else return (await Operator.create(operator))?.toObject();
    }

    public async findAllOperators(issuerId: string): Promise<IOperator[]> {
        return (await Operator.find({ issuerId })).map(e => e.toObject());
    }


    public async disable(userId: string, issuerId: string): Promise<string> {
        const operator = await Operator.findOne({ userId, issuerId });
        if (operator) {
            operator.activate = false;
            await operator.save();
            return userId;
        }
        else throw ("Operator no exist!")

    }
    // public async findByVerifier(verifierId: string): Promise<IOperator[]> {
    //     return (await Operator.find({ 
    //         adminId: verifierId,
    //         platform: Platform.VERIFIER
    //     })).map(e => e.toObject());
    // }

    // public async addOperatorByIssuer(operatorId: string, issuerId: string): Promise<IOperator | undefined> {
    //     if ((await this.findOneOperator(operatorId, issuerId, Platform.ISSUER)).length > 0)
    //         return undefined;

    //     return await this.addOperator(operatorId, issuerId, Platform.ISSUER);
    // }

    // public async removeOperatorByIssuer(operatorId: string, issuerId: string): Promise<IOperator | undefined> {
    //     const operator = (await this.findOneOperator(operatorId, issuerId, Platform.ISSUER))[0] ?? undefined;

    //     if (operator) await Operator.deleteOne({ _id: operator._id});
    //     return operator;
    // }

    // public async addOperatorByVerifier(operatorId: string, verifierId: string): Promise<IOperator | undefined> {
    //     if ((await this.findOneOperator(operatorId, verifierId, Platform.VERIFIER)).length > 0)
    //         return undefined;

    //     return await this.addOperator(operatorId, verifierId, Platform.VERIFIER);
    // }

    // public async removeOperatorByVerifier(operatorId: string, verifierId: string): Promise<IOperator | undefined> {
    //     const operator = (await this.findOneOperator(operatorId, verifierId, Platform.VERIFIER))[0] ?? undefined;

    //     if (operator) await Operator.deleteOne({ _id: operator._id});
    //     return operator;
    // }

}