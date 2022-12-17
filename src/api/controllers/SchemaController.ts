import { Request, Response } from 'express';

import { SchemaService } from '../services/SchemaService.js';
import { BadRequestError } from '../errors/http/BadRequestError.js';
import { NotFoundError } from '../errors/http/NotFoundError.js';

export class SchemaController {
    
    schemaService: SchemaService;
    
    constructor(){
        this.schemaService = new SchemaService();

        this.findAllSchemas = this.findAllSchemas.bind(this);
        this.fineOneSchema = this.fineOneSchema.bind(this);
    }

    public async findAllSchemas(req: Request, res: Response) {
        try {
            res.send({
                'schemas': await this.schemaService.findAll()
            })
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async fineOneSchema(req: Request, res: Response) {
        try {
            if (!req.params.schemaHash) throw new BadRequestError('Missing schemaHash in request params');
            const schema = await this.schemaService.findOne(req.params.schemaHash);
            if (schema === undefined) throw new NotFoundError('Schema does not exist');
            res.send({
                'schema': schema
            });
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async findSchemaContexts(req: Request, res: Response) {
        try {
            if (!req.params.schemaHash) throw new BadRequestError('Missing schemaHash in request params');
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }
}