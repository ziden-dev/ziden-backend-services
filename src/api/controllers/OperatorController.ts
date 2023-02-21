import { Request, Response } from 'express';
import axios from 'axios';

import { SchemaService } from '../services/SchemaService.js';
import { IssuerService } from '../services/IssuerService.js';
import { OperatorService } from '../services/OperatorService.js';
import { BadRequestError } from '../errors/http/BadRequestError.js';
import { NotFoundError } from '../errors/http/NotFoundError.js';
import logger from '../../lib/logger/index.js';
import { IOperator } from '../models/Operator.js';
import { v4 } from 'uuid';
import { OperatorRole, Portal } from '../../lib/constants/index.js';
import { sendRes } from '../responses/index.js';
export class OperatorController {


    operatorService: OperatorService;

    constructor() {
        this.operatorService = new OperatorService();
        this.createOperator = this.createOperator.bind(this);
        this.getAllOperators = this.getAllOperators.bind(this);
        this.removeOperator = this.removeOperator.bind(this)
    }

    public async createOperator(req: Request, res: Response) {
        try {
            const { verifierId } = req.params;
            const operator = {
                userId: req.body.operatorId.toString(),
                issuerId: verifierId.toString(),
                role: OperatorRole.Operator,
                claimId: '123',
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
}

