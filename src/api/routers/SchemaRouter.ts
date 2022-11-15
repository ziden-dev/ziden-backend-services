import { Router } from 'express';
import { SchemaController } from '../controllers/SchemaController';

export class SchemaRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public route() {
        // this.router.get('/', new RegistryController().test)
    }
}