import { Router } from 'express';
import { RegistryController } from '../controllers/RegistryController.js';

export class RegistryRouter {
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
         *     SchemaRegistry:
         *       properties:
         *         _id:
         *           type: string
         *           example: 66555d65-1e87-4428-86c1-35f0e23480f4
         *         schemaHash:
         *           type: string
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *         issuerId:
         *           type: string
         *           example: 82701632f563e84bcb34de9542d0457ff5cfb17bf9703f743afb93ba605cc6
         *         description:
         *           type: string
         *           example: This is a mock registry
         *         expiration:
         *           type: string
         *           example: 86400000
         *         updatable:
         *           type: string
         *           example: false
         *         network:
         *           type: string
         *           example: BSC Testnet
         *         endpointUrl:
         *           type: string
         *           example: https://example.com
         *     SchemaRegistryForm:
         *       properties:
         *         schemaHash:
         *           type: string
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *         issuerId:
         *           type: string
         *           example: 82701632f563e84bcb34de9542d0457ff5cfb17bf9703f743afb93ba605cc6
         *         description:
         *           type: string
         *           example: This is a mock registry
         *         expiration:
         *           type: string
         *           example: 86400000
         *         updatable:
         *           type: string
         *           example: false
         *         network:
         *           type: string
         *           example: BSC Testnet
         *         endpointUrl:
         *           type: string
         *           example: https://example.com
         *     Service:
         *       properties:
         *         _id:
         *           type: string
         *           example: 66555d65-1e87-4428-86c1-35f0e23480f4
         *         title:
         *           type: String
         *           example: Service's Title
         *         verifierId:
         *           type: string
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *         description:
         *           type: string
         *           example: This is a mock service
         *         requirements:
         *           type: array
         *           items:
         *             $ref: '#/components/schemas/Requirement'
         *         active:
         *           type: boolean
         *           default: true
         *         network:
         *           type: string
         *           example: 56
         *     ServiceForm:
         *       properties:
         *         title:
         *           type: String
         *           example: Service's Title
         *         verifierId:
         *           type: string
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *         description:
         *           type: string
         *           example: This is a mock service
         *         requirements:
         *           type: array
         *           items:
         *             $ref: '#/components/schemas/Requirement'
         *         active:
         *           type: boolean
         *           default: true
         *         network:
         *           type: string
         *           example: 56
         *     Requirement:
         *       properties:
         *         title:
         *           type: string
         *           example: Age Restriction
         *         attestation:
         *           type: string
         *           example: Born before 01/01/2001
         *         allowedIssuers:
         *           type: array
         *           items:
         *             type: string
         *         schemaHash:
         *           type: string
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *         circuitId:
         *           type: string
         *           example: credentialAtomicQueryMTP
         *         query:
         *           type: object
         *           properties:
         *             propertyName:
         *               type: string
         *               example: dateOfBirth
         *             operator:
         *               type: number
         *               example: 2
         *             value:
         *               type: array
         *               items:
         *                 type: number
         *                 example: 20010101
         */

        /**
         * @swagger
         * /api/registries/schemas:
         *   post:
         *     summary: Register new Schema
         *     description: Register new Schema
         *     tags:
         *       - Registry
         *     requestBody:
         *       description: A full JSON object of Issuer
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               registry:
         *                 $ref: '#/components/schemas/SchemaRegistryForm'
         *                 required: true
         *               schema:
         *                 $ref: '#/components/schemas/SchemaForm'
         *                 required: true
         *     responses:
         *       '200':
         *         description: A JSON object of Schema Registry & Schema
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 registry:
         *                   $ref: '#/components/schemas/SchemaRegistry'
         *                 schema:
         *                   $ref: '#/components/schemas/Schema'
         */
        // this.router.post('/schemas', (new RegistryController()).registerSchema);

        /**
         * @swagger
         * /api/registries/schemas:
         *   get:
         *     summary: Find many Schema Registry
         *     description: Get many registered Schema Registry
         *     tags:
         *       - Registry
         *     parameters:
         *       - in: query
         *         name: schemaHash
         *         schema:
         *           type: string
         *         description: Hash of Schema
         *       - in: query
         *         name: issuerId
         *         schema:
         *           type: string
         *         description: DID of Issuer
         *     responses:
         *       200:
         *         description: A JSON array of Schema Registry
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 registries:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/SchemaRegistry'
         */
        // this.router.get('/schemas', (new RegistryController()).findSchemaRegistries);

        /**
         * @swagger
         * /api/registries/schemas/{registryId}:
         *   get:
         *     summary: Find one Schema Registry
         *     description: Query an registered Schema Registry by unique ID
         *     tags:
         *       - Registry
         *     parameters:
         *       - in: path
         *         name: registryId
         *         schema:
         *           type: string
         *         required: true
         *         description: Unique ID of Schema Registry
         *     responses:
         *       200:
         *         description: A JSON object of Schema Registry & Schema
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               registry:
         *                 $ref: '#/components/schemas/SchemaRegistry'
         *               schema:
         *                 $ref: '#/components/schemas/Schema'
         */
        // this.router.get('/schemas/:registryId', (new RegistryController()).findSchemaRegistryById);

        // this.router.put('/schemas/:registryId', (new RegistryController()).updateSchemaRegistry);

        /**
         * @swagger
         * /api/registries/schemas/{registryId}/active:
         *   put:
         *     summary: Activate/Deactivate Schema Registry
         *     description: Toggle active status of a schema registry
         *     tags:
         *       - Registry
         *     parameters:
         *       - in: path
         *         name: registryId
         *         schema:
         *           type: string
         *         required: true
         *         description: Unique ID of Schema Registry
         *     responses:
         *       200:
         *         description: A JSON object of update result
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               registryId:
         *                 type: string
         *               active:
         *                 type: boolean
         */
        // this.router.put('/schemas/:registryId/active', (new RegistryController()).toggleSchemaRegistryActive);

        /**
         * @swagger
         * /api/registries/schemas/{registryId}/request:
         *   get:
         *     summary: Fetch data for request page
         *     description: Fetch data for request page
         *     tags:
         *       - Registry
         *     parameters:
         *       - in: path
         *         name: registryId
         *         schema:
         *           type: string
         *         required: true
         *         description: Unique ID of Schema Registry
         *     responses:
         *       200:
         *         description: A JSON object
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               title:
         *                 type: string
         *                 example: 'Demo Schema'
         *               provider:
         *                 type: string
         *                 example: 'Ziden Demo'
         *               description:
         *                 type: string
         *                 example: 'This is a mock request page'
         *               logoUrl:
         *                 type: string
         *                 example: 'https://example.logo'
         *               endpointUrl:
         *                 type: string
         *                 example: 'https://exapmle.endpoint.com'
         */
        // this.router.get('/schemas/:registryId/request', (new RegistryController()).fetchRegistryRequestPage);

        /**
         * @swagger
         * /api/registries/services:
         *   post:
         *     summary: Register new Service
         *     description: Register new Service
         *     tags:
         *       - Registry
         *     requestBody:
         *       description: A JSON object of Service
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               service:
         *                 $ref: '#/components/schemas/ServiceForm'
         *     responses:
         *       '200':
         *         description: A JSON object of Service
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 newService:
         *                   $ref: '#/components/schemas/Service'
         */
        // this.router.post('/services', (new RegistryController()).registerService);

        /**
         * @swagger
         * /api/registries/services:
         *   get:
         *     summary: Find all Service
         *     description: Get all registered Service
         *     tags:
         *       - Registry
         *     responses:
         *       200:
         *         description: A JSON array of Service
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 services:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/Service'
         *                 logos:
         *                   type: array
         *                   items:
         *                     type: string
         *                     example: 'https://example.logo.com'
         */
        // this.router.get('/services', (new RegistryController()).findAllServices);

        /**
         * @swagger
         * /api/registries/services/{serviceId}:
         *   get:
         *     summary: Find one Service
         *     description: Query an registered Service by unique ID
         *     tags:
         *       - Registry
         *     parameters:
         *       - in: path
         *         name: serviceId
         *         schema:
         *           type: string
         *         required: true
         *         description: Unique ID of Service
         *     responses:
         *       200:
         *         description: A JSON object of Service
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 service:
         *                   $ref: '#/components/schemas/Service'
         */
        // this.router.get('/services/:serviceId', (new RegistryController()).findOneService);

        // this.router.put('/services/:serviceId', (new RegistryController()).updateService);

        /**
         * @swagger
         * /api/registries/services/{serviceId}/active:
         *   put:
         *     summary: Activate/Deactivate Service
         *     description: Toggle active status of a service
         *     tags:
         *       - Registry
         *     parameters:
         *       - in: path
         *         name: serviceId
         *         schema:
         *           type: string
         *         required: true
         *         description: Unique ID of Service
         *     responses:
         *       200:
         *         description: A JSON object of update result
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               serviceId:
         *                 type: string
         *               active:
         *                 type: boolean
         */
        // this.router.put('/services/:serviceId/active', (new RegistryController()).toggleServiceActive);
    }
}