import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import env from '../../lib/env/index.js';
import logger from '../../lib/logger/index.js';

export class LogMiddleware {

    public use(req: Request, res: Response, next: NextFunction): any {
        const myStream = {
            write: (text: any) => {
                logger.info(text)
            }
        }
        
        return morgan(env.log.output, {
            stream: myStream,
        })(req, res, next);
    }

}
