import { Request, Response, Router } from 'express';
import { IssuerRouter } from './IssuerRouter.js';
import { ClaimRouter } from './ClaimRouter.js';
import { NetworkRouter } from './NetworkRouter.js';
import { ProofRouter } from './ProofRouter.js';
import { RegistryRouter } from './RegistryRouter.js';
import { SchemaRouter } from './SchemaRouter.js';
import { ServiceRouter } from './ServiceRouter.js';
import { VerifierRouter } from './VerifierRouter.js';
import { AuthenRouter } from './AuthenRouter.js';

export class Routers {
    public router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public route() {
        this.router.use('/claims', new ClaimRouter().router);
        this.router.use('/issuers', new IssuerRouter().router);
        this.router.use('/verifiers', new VerifierRouter().router);
        this.router.use('/schemas', new SchemaRouter().router);
        this.router.use('/registries', new RegistryRouter().router);
        this.router.use('/services', new ServiceRouter().router);
        this.router.use('/proofs', new ProofRouter().router);
        this.router.use('/networks', new NetworkRouter().router);
        this.router.use('/auth', new AuthenRouter().router);
    }
}