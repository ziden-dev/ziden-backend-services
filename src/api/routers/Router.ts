import { Router } from 'express';
import { LogMiddleware } from '../middlewares/LogMiddleware.js';
import { RegistryRouter } from './RegistryRouter.js';
import { SchemaRouter } from './SchemaRouter.js';
import { IssuerRouter } from './IssuerRouter.js';
import { VerifierRouter } from './VerifierRouter.js';
import { IdentityProviderRouter } from './IdentityProviderRouter.js';
import { ServiceProviderRouter } from './ServiceProviderRouter.js';
import { ClaimRouter } from './ClaimRouter.js';
import { ProofRouter } from './ProofRouter.js';

export class Routers {
    public router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public route() {
        this.router.use('/registries', new LogMiddleware().use, new RegistryRouter().router);
        this.router.use('/schemas', new LogMiddleware().use, new SchemaRouter().router);
        this.router.use('/issuers', new LogMiddleware().use, new IssuerRouter().router);
        this.router.use('/verifiers', new LogMiddleware().use, new VerifierRouter().router);
        this.router.use('/identityProviders', new LogMiddleware().use, new IdentityProviderRouter().router);
        this.router.use('/serviceProviders', new LogMiddleware().use, new ServiceProviderRouter().router);
        this.router.use('/claims', new LogMiddleware().use, new ClaimRouter().router);
        this.router.use('/proofs', new LogMiddleware().use, new ProofRouter().router);
    }
}