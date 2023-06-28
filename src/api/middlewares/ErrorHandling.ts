import { NextFunction, Request, Response, Router } from 'express';

import logger from '../../lib/logger/index.js';
import { sendRes } from '../responses/index.js';

export class ErrorHandling {

    public use(err: Error, req: Request, res: Response, next: NextFunction): any {
        logger.error(err);
        sendRes(res, err);
    }

}