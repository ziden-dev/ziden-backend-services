import { v4 } from "uuid";
import Operator, { IOperator } from "../models/Operator.js";
import { Portal } from "../../lib/constants/index.js";
import { NotFoundError } from "../errors/http/NotFoundError.js";
export class OperatorService {

    constructor() { }

    // private async findOneOperator(operatorId: string, adminId: string, platform: string): Promise<IOperator[]> {
    //     return (await Operator.find({
    //         operatorId: operatorId,
    //         adminId: adminId,
    //         platform: platform
    //     })).map(e => e.toObject());
    // }

    public async createOperator(operator: IOperator) {
        const lastOperator = await Operator.findOne({ userId: operator.userId, verifierId: operator.verifierId });
        if (lastOperator) {
            Object.assign(lastOperator, operator);
            await lastOperator.save();
            return lastOperator.toObject();
        }
        else return (await Operator.create(operator))?.toObject();
    }

    public async findAllOperators(verifierId: string) {
        return (await Operator.find({ verifierId: verifierId, activate: true })).map(e => e.toObject());
    }

    public async disable(userId: string, verifierId: string) {
        const operator = await Operator.findOne({ userId, verifierId: verifierId });
        console.log(userId);
        if (operator) {
            operator.activate = false;
            await operator.save();
            return operator;
        }
        else throw new NotFoundError("Operator does not exist!");
    }

    public async getAllVerifierByOperator(operatorId: string) {
        const operators = await Operator.find({ userId: operatorId });
        let verifierList: string[] = [];
        operators.forEach(operator => {
            const verifierId = operator.verifierId;
            if (typeof verifierId != 'string' || !verifierList.includes(verifierId)) {
                verifierList.push(verifierId);
            }
        });

        return verifierList;
    }

    // public async findByVerifier(verifierId: string): Promise<IOperator[]> {
    //     return (await Operator.find({ 
    //         adminId: verifierId,
    //         platform: Platform.VERIFIER
    //     })).map(e => e.toObject());
    // }

    // public async addOperatorByIssuer(operatorId: string, verifierId: string): Promise<IOperator | undefined> {
    //     if ((await this.findOneOperator(operatorId, verifierId, Platform.ISSUER)).length > 0)
    //         return undefined;

    //     return await this.addOperator(operatorId, verifierId, Platform.ISSUER);
    // }

    // public async removeOperatorByIssuer(operatorId: string, verifierId: string): Promise<IOperator | undefined> {
    //     const operator = (await this.findOneOperator(operatorId, verifierId, Platform.ISSUER))[0] ?? undefined;

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