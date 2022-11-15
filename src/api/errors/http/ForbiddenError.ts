import { HttpError } from "./HttpError";

export class ForbiddenError extends HttpError {
    name = 'ForbiddenError';
    
    constructor(message?: string) {
        super(403, message);

        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}