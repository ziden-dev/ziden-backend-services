import { Request, Response } from 'express';
import axios from 'axios';

import { ISchema } from '../models/Schema.js';
import { SchemaService } from '../services/SchemaService.js';
import { BadRequestError } from '../errors/http/BadRequestError.js';
import { NotFoundError } from '../errors/http/NotFoundError.js';
import { sendRes } from '../responses/index.js';
import utils from '../utils/index.js';
import logger from '../../lib/logger/index.js';

export class SchemaController {
    
    schemaService: SchemaService;
    
    constructor(){
        this.schemaService = new SchemaService();

        this.registerSchema = this.registerSchema.bind(this);
        this.findAllSchemas = this.findAllSchemas.bind(this);
        this.fineOneSchema = this.fineOneSchema.bind(this);
        this.getAllDataTypes = this.getAllDataTypes.bind(this);
    }

    public async findAllSchemas(req: Request, res: Response) {
        try {
            // FIXME: add query
            const schemas = await this.schemaService.findAll();

            schemas.map(schema => { delete schema._id });

            /* Currently not necessary to retrieve context for all schemas */
            // await Promise.all(schemas.map(async (schema) => {
            //     schema.jsonSchema = (await axios.get(schema.accessUri)).data
            //     delete schema._id;
            // }));
            // await Promise.all(schemas.map(async schema => {
            //     schema.jsonSchema = await utils.fetchSchemaContext(schema.jsonSchema);
            //     delete schema._id;
            // }));

            sendRes(res, null, { 'schemas': schemas });
        } catch (error: any) {
            sendRes(res, error);
        }
    }

    public async fineOneSchema(req: Request, res: Response) {
        try {
            if (!req.params.schemaHash) throw new BadRequestError('Missing schemaHash in request params');
            const schema = await this.schemaService.findOneById(req.params.schemaHash as string);
            if (schema === undefined) throw new NotFoundError('Schema does not exist');
            schema.jsonSchema = await utils.fetchSchemaContext((await axios.get(schema.accessUri)).data);
            sendRes(res, null, { 'schema': schema });
        } catch (error: any) {
            sendRes(res, error);
        }
    }

    public async registerSchema(req: Request, res: Response) {
        try {
            if (!req.body.schema) throw new BadRequestError('Missing schemaHash in request body');
            const newSchema = await this.schemaService.createSchema(req.body.schema);
            if (newSchema === false) throw new BadRequestError('Schema existed');
            delete (newSchema as ISchema)._id;
            sendRes(res, null, { 'schema': newSchema })
        } catch (error: any) {
            sendRes(res, error);
        }
    }

    // public async findSchemaContexts(req: Request, res: Response) {
    //     try {
    //         if (!req.params.schemaHash) throw new BadRequestError('Missing schemaHash in request params');
    //     } catch (error: any) {
    //         res.status(error.httxpCode ?? 500).send(error);
    //     }
    // }

    // public async getAllSchemasTitle(req: Request, res: Response) {
    //     try {
    //         res.send({
    //             'titles': (await this.schemaService.findAll())?.map(e => e.title)
    //         })
    //     } catch (error: any) {
    //         res.status(error.httpCode ?? 500).send(error);
    //     }
    // }

    public async getAllDataTypes(req: Request, res: Response) {
        try {
            res.send({
                'dataTypes': this.schemaService.getSupportedDataTypes()
            })
        } catch (error: any) {
            logger.error(error)
            res.status(error.httpCode ?? 500).send(error);
        }
    }
}