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
         *           description: Unique Id of a Registry Service
         *         description:
         *           type: string
         *           example: This is a mock registry
         *           description: Description about Registry Service
         *         expiration:
         *           type: number
         *           example: 86400000
         *           description: Expiration time of a claim
         *         updatable:
         *           type: boolean
         *           example: true
         *           description: Updatable flag in claim
         *         endpointUrl:
         *           type: string
         *           example: https://example.com
         *           description: Registry endpoint url
         *         schema:
         *           type: object
         *           description: Schema information in this registry service
         *           properties:
         *             name:
         *               type: string
         *               example: Demo Schema
         *               description: Schema name
         *             schemaHash:
         *               type: string
         *               example: 8077d5cb0c7bfbcff2197d3b1f651901
         *               description: Schema Hash
         *         issuer:
         *           type: object
         *           description: Issuer Information
         *           properties:
         *             issuerId:
         *               type: string
         *               example: 82701632f563e84bcb34de9542d0457ff5cfb17bf9703f743afb93ba605cc6
         *               description: DID of Issuer
         *             name:
         *               type: string
         *               example: Demo Issuer
         *               description: Issuer's name
         *             logoUrl:
         *               type: string
         *               example: https://image.logo.url
         *               description: Issuer's Logo Url
         *         network:
         *           type: object
         *           description: Network Supported
         *           properties:
         *             networkId:
         *               type: string
         *               example: 97
         *               description: Network chain Id
         *             name:
         *               type: string
         *               example: BNB Chain Testnet
         *               description: Network name
         *     SchemaRegistryForm:
         *       properties:
         *         schemaHash:
         *           type: string
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *           description: Schema Hash
         *         issuerId:
         *           type: string
         *           description: DID of Issuer
         *           example: 82701632f563e84bcb34de9542d0457ff5cfb17bf9703f743afb93ba605cc6
         *         description:
         *           type: string
         *           description: Description about Registry service
         *           example: This is a mock registry
         *         expiration:
         *           type: string
         *           example: 86400000
         *           description: Expiration date of claim
         *         updatable:
         *           type: string
         *           example: false
         *           description: Updatetable flag in claim
         *         network:
         *           type: string
         *           example: BSC Testnet
         *           description: network
         *         endpointUrl:
         *           type: string
         *           example: https://example.com
         *           description: Endpoint Url
         *     Service:
         *       properties:
         *         _id:
         *           type: string
         *           example: 66555d65-1e87-4428-86c1-35f0e23480f4
         *           description: Unique Id of Service
         *         title:
         *           type: String
         *           example: Service's Title
         *           description: Title of Serivce
         *         verifierId:
         *           type: string
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *           description: DID of Verifier
         *         description:
         *           type: string
         *           example: This is a mock service
         *           description: Description about this service
         *         requirements:
         *           type: array
         *           items:
         *             $ref: '#/components/schemas/Requirement'
         *         active:
         *           type: boolean
         *           default: true
         *           description: Is service is active?
         *         network:
         *           type: integer
         *           example: 97
         *           description: Network chain Id
         *     ServiceForm:
         *       properties:
         *         title:
         *           type: String
         *           example: Service's Title
         *           description: Title
         *         verifierId:
         *           type: string
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *           description: DID of verifier
         *         description:
         *           type: string
         *           example: This is a mock service
         *           description: Description about this Service
         *         requirements:
         *           type: array
         *           items:
         *             $ref: '#/components/schemas/Requirement'
         *         active:
         *           type: boolean
         *           default: true
         *         network:
         *           type: integer
         *           example: 97
         *           description: Network chain Id
         *     Requirement:
         *       properties:
         *         title:
         *           type: string
         *           example: Age Restriction
         *           description: Requimenet's title
         *         attestation:
         *           type: string
         *           example: Born before 01/01/2001
         *           description: Description about this requirement
         *         allowedIssuers:
         *           type: array
         *           description: Array of allowed Issuers
         *           items:
         *             type: string
         *             example: 1234
         *         schemaHash:
         *           type: string
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *           description: Schema hash
         *         circuitId:
         *           type: string
         *           example: credentialAtomicQueryMTP
         *           description: Circuit Id
         *         query:
         *           type: object
         *           properties:
         *             propertyName:
         *               type: string
         *               example: dateOfBirth
         *               description: Name of property need to query
         *             operator:
         *               type: number
         *               example: 2
         *               description: Operator compare
         *             value:
         *               type: array
         *               description: Array of values compare
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
         *           example: 1234
         *         required: true
         *         description: Unique ID of Schema Registry
         *     responses:
         *       200:
         *         description: A JSON object of Schema Registry
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                  registry:
         *                      $ref: '#/components/schemas/SchemaRegistry'
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
        this.router.get('/:registryId', (new RegistryController()).findSchemaRegistryById);

        /**
         * @swagger
         * /api/v1/registries:
         *   get:
         *     summary: Get all Registry Service
         *     description: Get all registry Service
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
         *                type: object
         *                properties:
         *                    registries:
         *                      type: array
         *                      items:
         *                          $ref: '#/components/schemas/SchemaRegistry'
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
        this.router.get('/', (new RegistryController()).findSchemaRegistries);
    }   
}