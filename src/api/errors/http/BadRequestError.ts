import { HttpError } from './HttpError.js';

export class BadRequestError extends HttpError {
    name = 'BadRequestError';
    
    constructor(message?: string) {
        super(400, message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}