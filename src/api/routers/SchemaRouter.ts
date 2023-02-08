import { Router } from 'express';
import { SchemaController } from '../controllers/SchemaController.js';

export class SchemaRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public route() {

        /**
         * @swagger
         * components:
         *   schemas:
         *     Schema:
         *       properties:
         *         _id:
         *           type: string
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *         schemaHash:
         *           type: string
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *         title:
         *           type: string
         *           example: Demo Schema
         *         properties:
         *           type: object
         *         index:
         *           type: array
         *           items:
         *             type: string
         *         value:
         *           type: array
         *           items:
         *             type: string
         *         required:
         *           type: array
         *           items:
         *             type: string
         *     SchemaForm:
         *       properties:
         *         title:
         *           type: string
         *           example: Demo Schema
         *         properties:
         *           type: object
         *         index:
         *           type: array
         *           items:
         *             type: string
         *         value:
         *           type: array
         *           items:
         *             type: string
         *         required:
         *           type: array
         *           items:
         *             type: string
         */

        /**
         * @swagger
         * /api/v1/schemas:
         *   get:
         *     summary: Find all Schema
         *     description: Get all registered Schema
         *     tags:
         *       - Schema
         *     responses:
         *       200:
         *         description: A JSON array of Schema
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 schemas:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/Schema'
         */
        this.router.get('/', (new SchemaController()).findAllSchemas);

        /**
         * @swagger
         * /api/v1/schemas/dataTypes:
         *   get:
         *     summary: Find all supported data types
         *     description: Get all supported data types for a schema's property
         *     tags:
         *       - Schema
         *     responses:
         *       200:
         *         description: A JSON array of string
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 dataTypes:
         *                   type: array
         *                   items:
         *                     type: string
         */
        // this.router.get('/dataTypes', (new SchemaController()).getAllDataTypes);

        /**
         * @swagger
         * /api/v1/schemas/{schemaHash}:
         *   get:
         *     summary: Find one Schema
         *     description: Query an registered Schema by schemaHash
         *     tags:
         *       - Schema
         *     parameters:
         *       - in: path
         *         name: schemaHash
         *         schema:
         *           type: string
         *         required: true
         *         description: Schema hash
         *     responses:
         *       200:
         *         description: A JSON object of Schema
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 schema:
         *                   $ref: '#/components/schemas/Schema'
         */
        // this.router.get('/:schemaHash', (new SchemaController()).fineOneSchema);

        // this.router.get('/:schemaHash/contexts');
    }
}