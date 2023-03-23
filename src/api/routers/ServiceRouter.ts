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
         *     Service:
         *       properties:
         *         serviceId:
         *           type: string
         *           example: 66555d65-1e87-4428-86c1-35f0e23480f4
         *         name:
         *           type: string
         *           example: Service's Title
         *         verifier:
         *           type: object
         *           properties:
         *             verifierId:
         *               type: string
         *               example: 8077d5cb0c7bfbcff2197d3b1f651901
         *             name:
         *               type: string
         *               example: Verifier's Name
         *             logoUrl:
         *               type: string
         *               example: https://image.logo.url
         *         description:
         *           type: string
         *           example: This is a mock service
         *         network:
         *           type: object
         *           properties:
         *             networkId:
         *               type: string
         *               example: 56
         *             name:
         *               type: string
         *               example: BNB Chain
         *         active:
         *           type: boolean
         *           default: true
         *         requirements:
         *           type: array
         *           items:
         *             $ref: '#/components/schemas/Requirement'
         *     ServiceForm:
         *       properties:
         *         name:
         *           type: String
         *           required: true
         *           example: Service's Title
         *         verifierId:
         *           type: string
         *           required: true
         *           example: 8077d5cb0c7bfbcff2197d3b1f651901
         *         description:
         *           type: string
         *           required: true
         *           example: This is a mock service
         *         networkId:
         *           type: string
         *           required: true
         *           example: 56
         *         requirements:
         *           type: array
         *           items:
         *             $ref: '#/components/schemas/Requirement'
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
         *   securitySchemes: 
         *       Authorization:
         *         in: header
         *         name: Authorization
         *         type: apiKey
         *         description: Token authorization
         */

        /**
         * @swagger
         * /api/v1/services:
         *   post:
         *     security:
         *       - Authorization: []
         *     summary: Create new Service
         *     description: Register new Service
         *     tags:
         *       - Service
         *     requestBody:
         *       description: A JSON form of Service
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/ServiceForm'
         *     responses:
         *       '200':
         *         description: A JSON object of Service
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               service:
         *                 $ref: '#/components/schemas/Service'
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
         *         description: DID of Verifier
         *       - in: query
         *         name: active
         *         schema:
         *           type: boolean
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
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/Service'
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
         *         required: true
         *         description: Unique ID of Service
         *     responses:
         *       200:
         *         description: A JSON object of Service
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               provider:
         *                 $ref: '#/components/schemas/Service'
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
        this.router.put('/:serviceId/active', (new ServiceController()).checkServiceAuthen, (new ServiceController()).toggleServiceActive);
    
    }
}