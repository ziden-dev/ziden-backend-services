import { HttpError } from './HttpError.js';

export class NotFoundError extends HttpError {
    name = 'NotFoundError';
    
    constructor(message?: string) {
        super(404, message);

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}