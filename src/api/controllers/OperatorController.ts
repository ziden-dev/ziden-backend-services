import { Request, Response } from 'express';
import axios from 'axios';

import { SchemaService } from '../services/SchemaService.js';
import { IssuerService } from '../services/IssuerService.js';
import { OperatorService } from '../services/OperatorService.js';
import { BadRequestError } from '../errors/http/BadRequestError.js';
import { NotFoundError } from '../errors/http/NotFoundError.js';
import logger from '../../lib/logger/index.js';
import Operator, { IOperator } from '../models/Operator.js';
import { v4 } from 'uuid';
import { OperatorRole, Portal } from '../../lib/constants/index.js';
import { sendRes } from '../responses/index.js';
import { createOperatorInAuthen, getOperatorInforInAuthen } from '../services/Authen.js';
export class OperatorController {


    operatorService: OperatorService;

    constructor() {
        this.operatorService = new OperatorService();
        this.createOperator = this.createOperator.bind(this);
        this.getAllOperators = this.getAllOperators.bind(this);
        this.removeOperator = this.removeOperator.bind(this);
        this.getOperatorInfor = this.getOperatorInfor.bind(this);
    }

    public async createOperator(req: Request, res: Response) {
        try {
            const token = req.headers.authorization;
            if (!token || typeof token != "string") {
                throw new BadRequestError("Invalid token");
            }

            const { verifierId } = req.params;

            const { operatorId } = req.body;

            if (!operatorId) {
                throw new BadRequestError("Invalid operator");
            }

            if (!verifierId) {
                throw new BadRequestError("Invalid verifierId");
            }
            
            const createOperatorResponse = await createOperatorInAuthen(operatorId, verifierId, token);

            const operator = {
                userId: req.body.operatorId.toString(),
                issuerId: verifierId.toString(),
                role: OperatorRole.Operator,
                claimId: createOperatorResponse.claimId,
                activate: true,
                portal: Portal.Veifier
            }

            const newOperator = await this.operatorService.createOperator(operator);
            sendRes(res, null, { 'operatorId': newOperator.userId, 'createdAt': (newOperator as any).createdAt })
        } catch (error: any) {
            logger.error(error);
            sendRes(res, error);
        }
    }

    public async getAllOperators(req: Request, res: Response) {
        try {
            const { verifierId } = req.params;
            sendRes(res, null, {
                'operators': (await this.operatorService.findAllOperators(verifierId))
                    .map((e: any) => { return { 'operatorId': e.userId, 'createdAt': e.createdAt } })
            });
        } catch (error: any) {
            logger.error(error);
            sendRes(res, error);
        }
    }

    public async removeOperator(req: Request, res: Response) {
        try {
            const { operatorId, verifierId } = req.params;
            sendRes(res, null, { 'operatorId': (await this.operatorService.disable(operatorId, verifierId)).userId });
        } catch (error: any) {
            logger.error(error);
            sendRes(res, error);
        }
    }

    public async getOperatorInfor(req: Request, res: Response) {
        try {
            const {verifierId, operatorId} = req.params;
            if (!verifierId || typeof verifierId != "string") {
                throw new BadRequestError("Invalid verifierId");
            }

            if (!operatorId || typeof operatorId != "string") {
                throw new BadRequestError("Invalid operatorId");
            }

            const operator = await Operator.findOne({issuerId: verifierId, userId: operatorId});
            if (!operator) {
                throw new BadRequestError("Operator not exits!");
            }

            if (!operator.activate) {
                throw new BadRequestError("Operator not activate!");
            }

            const operatorInfor = await getOperatorInforInAuthen(operatorId, verifierId);
            sendRes(res, null, operatorInfor);

        } catch(err: any) {
            console.log(err);
            sendRes(res, err);
        }
    }

}

