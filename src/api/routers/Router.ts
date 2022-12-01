import { Router } from 'express';
import { LogMiddleware } from '../middlewares/LogMiddleware';
import { RegistryRouter } from './RegistryRouter';
import { SchemaRouter } from './SchemaRouter';
import { IssuerRouter } from './IssuerRouter';
import { VerifierRouter } from './VerifierRouter';
import { IdentityProviderRouter } from './IdentityProviderRouter';
import { ServiceProviderRouter } from './ServiceProviderRouter';
import { ClaimRouter } from './ClaimRouter';
import { ProofRouter } from './ProofRouter';

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