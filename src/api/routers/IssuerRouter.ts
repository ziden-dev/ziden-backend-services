import { Router } from 'express';
import { IssuerController } from '../controllers/IssuerController.js';

export class IssuerRouter {
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
         *     Issuer:
         *       properties:
         *         _id:
         *           type: string
         *           example: 82701632f563e84bcb34de9542d0457ff5cfb17bf9703f743afb93ba605cc6
         *         providerId:
         *           type: string
         *           example: 66555d65-1e87-4428-86c1-35f0e23480f4
         *         endpointUrl:
         *           type: string
         *           example: https://issuer.endpoint.com/api/registration
         */

        /**
         * @swagger
         * /api/issuers:
         *   post:
         *     summary: Create new Issuer
         *     description: Register new Issuer
         *     tags:
         *       - Issuer
         *     requestBody:
         *       description: A full JSON object of Issuer
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               issuer:
         *                 $ref: '#/components/schemas/Issuer'
         *     responses:
         *       '200':
         *         description: A JSON object of Issuer
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               newIssuer:
         *                 $ref: '#/components/schemas/Issuer'
         */
        this.router.post('/', (new IssuerController()).createIssuer);

        /**
         * @swagger
         * /api/issuers:
         *   get:
         *     summary: Find all Issuer
         *     description: Get all registered Issuers
         *     tags:
         *       - Issuer
         *     responses:
         *       200:
         *         description: A JSON array of Issuer
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 issuers:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/Issuer'
         */
        this.router.get('/', (new IssuerController()).findAllIssuers);

        /**
         * @swagger
         * /api/issuers/{issuerId}:
         *   get:
         *     summary: Find one Issuer
         *     description: Query an registered Issuer by DID
         *     tags:
         *       - Issuer
         *     parameters:
         *       - in: path
         *         name: issuerId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Issuer
         *     responses:
         *       200:
         *         description: A JSON object of Issuer
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 issuer:
         *                   $ref: '#/components/schemas/Issuer'
         */
        this.router.get('/:issuerId', (new IssuerController()).findOneIssuer);

    }
}