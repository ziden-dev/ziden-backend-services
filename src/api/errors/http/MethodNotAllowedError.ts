import { HttpError } from "./HttpError";

export class MethodNotAllowedError extends HttpError {
    name = 'MethodNotAllowedError';
    
    constructor(message?: string) {
        super(405, message);

        Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
    }
}