import { Router } from 'express';
import { RegistryRouter } from './RegistryRouter.js';
import { SchemaRouter } from './SchemaRouter.js';
import { IssuerRouter } from './IssuerRouter.js';
import { VerifierRouter } from './VerifierRouter.js';
import { IdentityProviderRouter } from './IdentityProviderRouter.js';
import { ServiceProviderRouter } from './ServiceProviderRouter.js';
import { ClaimRouter } from './ClaimRouter.js';
import { ProofRouter } from './ProofRouter.js';
import { NetworkRouter } from './NetworkRouter.js';

export class Routers {
    public router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public route() {
        this.router.use('/networks', new NetworkRouter().router);
        this.router.use('/registries', new RegistryRouter().router);
        this.router.use('/schemas', new SchemaRouter().router);
        this.router.use('/issuers', new IssuerRouter().router);
        this.router.use('/verifiers', new VerifierRouter().router);
        this.router.use('/identityProviders', new IdentityProviderRouter().router);
        this.router.use('/serviceProviders', new ServiceProviderRouter().router);
        this.router.use('/claims', new ClaimRouter().router);
        this.router.use('/proofs', new ProofRouter().router);
    }
}