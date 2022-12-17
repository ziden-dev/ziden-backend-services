import { HttpError } from './HttpError.js';

export class UnauthorizedError extends HttpError {
    name = 'UnauthorizedError';
    
    constructor(message?: string) {
        super(401, message);

        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}