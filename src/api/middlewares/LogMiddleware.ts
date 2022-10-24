import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { Logger as LoggerInterface } from 'winston';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

import env from '../../lib/env';
import { Logger } from '../../decorators/Logger';

@Middleware({ type: 'before' })
export class LogMiddleware implements ExpressMiddlewareInterface {

    constructor (
        @Logger() private logger: LoggerInterface
    ) { }

    public use(req: Request, res: Response, next: NextFunction): any {
        const myStream = {
            write: (text: any) => {
                this.logger.info(text)
            }
        }
        
        return morgan(env.log.output, {
            stream: myStream,
        })(req, res, next);
    }

}
