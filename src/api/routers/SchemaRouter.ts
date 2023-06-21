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
         *         name:
         *           type: string
         *           example: Demo Schema
         *           description: Name of Schema
         *         hash:
         *           type: string
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *           description: Schema Hash
         *         accessUri:
         *           type: string
         *           example: https://schema.access.url/#identifier
         *           description: Schema Uri
         *         jsonSchema:
         *           type: object
         *           description: Schema Form
         *     SchemaMetadata:
         *       properties:
         *         name:
         *           type: string
         *           example: Demo Schema
         *           description: Name of Schema
         *         hash:
         *           type: string
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *           description: Schema Hash
         *         accessUri:
         *           type: string
         *           example: https://schema.access.url/#identifier
         *           description: Schema Uri
         *       required:
         *          - name
         *          - hash
         *          - accessUri
         */

        /**
         * @swagger
         * /api/v1/schemas:
         *   post:
         *     summary: Create new schema
         *     description: Add new schema and save it to database.
         *     tags:
         *       - Schema
         *     requestBody:
         *       description: A JSON object of Schema's metadata
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               schema:
         *                 $ref: '#/components/schemas/SchemaMetadata'
         *             required:
         *               - schema
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
         *       '500':
         *         description: Error Response
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   description: Message error
         *                   example: Error message
         */
        this.router.post('/', (new SchemaController()).registerSchema);

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
         *       '500':
         *         description: Error Response
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   description: Message error
         *                   example: Error message
         */
        this.router.get('/', (new SchemaController()).findAllSchemas);

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
         *           description: Schema Hash
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
         *       '500':
         *         description: Error Response
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   description: Message error
         *                   example: Error message
         */
        this.router.get('/:schemaHash', (new SchemaController()).fineOneSchema);

        /**
         * swagger // FIXME
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

        
    }
}