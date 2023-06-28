import { HttpError } from './HttpError.js';

export class InternalServerError extends HttpError {
    name = 'InternalServerError';
    
    constructor(message?: string) {
        super(500, message);

        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}