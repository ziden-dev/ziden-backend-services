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
         *         registryId:
         *           type: string
         *           example: 66555d65-1e87-4428-86c1-35f0e23480f4
         *         description:
         *           type: string
         *           example: This is a mock registry
         *         expiration:
         *           type: number
         *           example: 86400000
         *         updatable:
         *           type: boolean
         *         endpointUrl:
         *           type: string
         *           example: https://example.com
         *         schema:
         *           type: object
         *           properties:
         *             name:
         *               type: string
         *               example: Demo Schema
         *             schemaHash:
         *               type: string
         *               example: 8077d5cb0c7bfbcff2197d3b1f651901
         *         issuer:
         *           type: object
         *           properties:
         *             issuerId:
         *               type: string
         *               example: 82701632f563e84bcb34de9542d0457ff5cfb17bf9703f743afb93ba605cc6
         *             name:
         *               type: string
         *               example: Demo Issuer
         *             logoUrl:
         *               type: string
         *               example: https://image.logo.url
         *         network:
         *           type: object
         *           properties:
         *             networkId:
         *               type: string
         *               example: 97
         *             name:
         *               type: string
         *               example: BNB Chain Testnet
         * 
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
         * /api/v1/registries/{registryId}:
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
         *         description: A JSON object of Schema Registry
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               registry:
         *                 $ref: '#/components/schemas/SchemaRegistry'
         */
        this.router.get('/:registryId', (new RegistryController()).findSchemaRegistryById);

        /**
         * @swagger
         * /api/v1/registries:
         *   get:
         *     summary: Find one Schema Registry
         *     description: Query an registered Schema Registry by unique ID
         *     tags:
         *       - Registry
         *     parameters:
         *       - in: query
         *         name: issuerId
         *         schema:
         *           type: string
         *         description: DID of Issuer
         *       - in: query
         *         name: schemaHash
         *         schema:
         *           type: string
         *         description: Unique hash of Schema
         *     responses:
         *       200:
         *         description: A JSON object of Schema Registry
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               registries:
         *                 type: array
         *                 items:
         *                   $ref: '#/components/schemas/SchemaRegistry'
         */
        this.router.get('/', (new RegistryController()).findSchemaRegistries);
    }   
}