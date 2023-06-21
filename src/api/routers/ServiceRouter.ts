import { Router } from 'express';
import { ServiceController } from '../controllers/ServiceController.js';

export class ServiceRouter {
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
         *     ServiceInfo:
         *       properties:
         *         serviceId:
         *           type: string
         *           example: 66555d65-1e87-4428-86c1-35f0e23480f4
         *           description: Unique Id of Service
         *         name:
         *           type: string
         *           example: Service's Title
         *           description: Service's Title
         *         verifier:
         *           type: object
         *           description: Information about Verifier
         *           properties:
         *             verifierId:
         *               type: string
         *               example: 8077d5cb0c7bfbcff2197d3b1f651901
         *               description: DID of verifier
         *             name:
         *               type: string
         *               example: Verifier's Name
         *               description: Name of Veririfer
         *             logoUrl:
         *               type: string
         *               example: https://image.logo.url
         *               description: Verifier's Logo Url
         *         description:
         *           type: string
         *           example: This is a mock service
         *           description: Description about this Service
         *         network:
         *           type: object
         *           description: Information about supported network
         *           properties:
         *             networkId:
         *               type: integer
         *               example: 56
         *               description: Network chain Id
         *             name:
         *               type: string
         *               example: BNB Chain
         *               description: Name of supported network
         *         active:
         *           type: boolean
         *           default: true
         *         requirements:
         *           type: array
         *           items:
         *             $ref: '#/components/schemas/Requirement'
         *     ServiceFormCreate:
         *       properties:
         *         name:
         *           type: String
         *           example: Service's Name
         *           description: Service's Name
         *         verifierId:
         *           type: string
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *           description: DID of verifier
         *         description:
         *           type: string
         *           example: This is a mock service
         *           description: Description about this Service
         *         networkId:
         *           type: string
         *           example: 97
         *           description: Supported network chain id
         *         requirements:
         *           items:
         *             $ref: '#/components/schemas/Requirement'
         *       required:
         *          - name
         *          - verifierId
         *          - description
         *          - networkId
         *          - requirements
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
         *   securitySchemes: 
         *       Authorization:
         *         in: header
         *         name: Authorization
         *         type: apiKey
         *         description: JWZ Token
         */

        /**
         * @swagger
         * /api/v1/services:
         *   post:
         *     security:
         *       - Authorization: []
         *     summary: Create new Service
         *     description: Verifier Resiger new service
         *     tags:
         *       - Service
         *     requestBody:
         *       description: A JSON form of Service
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/ServiceFormCreate'
         *     responses:
         *       '200':
         *         description: A JSON object of Service
         *         content:
         *           application/json:
         *             schema:
         *              type: object
         *              properties:
         *                  service:
         *                      $ref: '#/components/schemas/ServiceInfo'
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
        this.router.post('/', (new ServiceController()).registerService);

        /**
         * @swagger
         * /api/v1/services:
         *   get:
         *     summary: Find all Service
         *     description: Get all registered Service
         *     tags:
         *       - Service
         *     parameters:
         *       - in: query
         *         name: verifierId
         *         schema:
         *           type: string
         *           example: 1234
         *         description: DID of Verifier
         *       - in: query
         *         name: active
         *         schema:
         *           type: boolean
         *           example: true
         *         description: Query by Service status
         *     responses:
         *       200:
         *         description: A JSON array of Service
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 providers:
         *                   description: Array of Serivce
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/ServiceInfo'
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
        this.router.get('/', (new ServiceController()).findServices);

        /**
         * @swagger
         * /api/v1/services/{serviceId}:
         *   get:
         *     summary: Find one Service
         *     description: Query an registered Service by unique ID
         *     tags:
         *       - Service
         *     parameters:
         *       - in: path
         *         name: serviceId
         *         schema:
         *           type: string
         *           example: 1234
         *         required: true
         *         description: Unique ID of Service
         *     responses:
         *       200:
         *         description: A JSON object of Service
         *         content:
         *           application/json:
         *             schema:
         *              type: object
         *              properties:
         *               provider:
         *                 description: Service Provier
         *                 $ref: '#/components/schemas/ServiceInfo'
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
        this.router.get('/:serviceId', (new ServiceController()).findServiceById);

        /**
         * swagger // FIXME
         * /api/v1/services/{serviceId}:
         *   put:
         *     security:
         *       - Authorization: []
         *     summary: Activate/Deactivate Service
         *     description: Toggle active status of a service
         *     tags:
         *       - Service
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
        // this.router.put('/services/:serviceId', (new ServiceController()).checkServiceAuthen, (new ServiceController()).updateService);

        /**
         * @swagger
         * /api/v1/services/{serviceId}/active:
         *   put:
         *     security:
         *       - Authorization: []
         *     summary: Activate/Deactivate Service
         *     description: Toggle active status of a service
         *     tags:
         *       - Service
         *     parameters:
         *       - in: path
         *         name: serviceId
         *         schema:
         *           type: string
         *           example: 1234
         *         required: true
         *         description: Unique ID of Service
         *     responses:
         *       200:
         *         description: A JSON object of update result
         *         content:
         *           application/json:
         *             schema:
         *              type: object
         *              properties:
         *               serviceId:
         *                 type: string
         *                 description: Unique Id of service
         *                 example: 1234
         *               active:
         *                 type: boolean
         *                 description: Service status
         *                 example: true
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
        this.router.put('/:serviceId/active', (new ServiceController()).toggleServiceActive);
    
    }
}