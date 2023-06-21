import { Request, Response, Router } from 'express';
import { ProofRouter } from './ProofRouter.js';
import { SchemaRouter } from './SchemaRouter.js';
import { ServiceRouter } from './ServiceRouter.js';

export class Routers {
    public router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public route() {
        this.router.use('/schemas', new SchemaRouter().router);
        this.router.use('/services', new ServiceRouter().router);
        this.router.use('/proofs', new ProofRouter().router);
    }
}