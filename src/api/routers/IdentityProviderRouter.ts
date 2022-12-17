import { Router } from 'express';
import { IdentityProviderController } from '../controllers/IdentityProviderController.js';

export class IdentityProviderRouter {
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
         *     IdentityProvider:
         *       properties:
         *         _id:
         *           type: string
         *           example: 66555d65-1e87-4428-86c1-35f0e23480f4
         *         name:
         *           type: string
         *           example: Organization Ltd
         *         description:
         *           type: string
         *           example: This is our Organization Ltd, we provide identity source
         *         contact:
         *           type: string
         *           example: contact@organiza.tion
         *         website:
         *           type: string
         *           example: https://organiza.tion
         *         logoUrl:
         *           type: string
         *           example: https://logo.jpg
         *     IdentityProviderForm:
         *       properties:
         *         name:
         *           type: string
         *           example: Organization Ltd
         *         description:
         *           type: string
         *           example: This is our Organization Ltd, we provide identity source
         *         contact:
         *           type: string
         *           example: contact@organiza.tion
         *         website:
         *           type: string
         *           example: https://organiza.tion
         *         logoUrl:
         *           type: string
         *           example: https://logo.jpg
         */

        /**
         * @swagger
         * /api/identityProviders:
         *   post:
         *     summary: Create new Identity Provider
         *     description: Register new Identity Provider
         *     tags:
         *       - Identity Provider
         *     requestBody:
         *       description: A JSON form of Identity Provider
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               provider:
         *                 $ref: '#/components/schemas/IdentityProvider'
         *     responses:
         *       '200':
         *         description: A JSON object of Identity Provider
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               newProvider:
         *                 $ref: '#/components/schemas/IdentityProvider'
         */
        this.router.post('/', (new IdentityProviderController()).registerIdentityProvider);
        
        /**
         * @swagger
         * /api/identityProviders:
         *   get:
         *     summary: Find all Identity Provider
         *     description: Get all registered Identity Provider
         *     tags:
         *       - Identity Provider
         *     responses:
         *       200:
         *         description: A JSON array of Identity Provider
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 providers:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/IdentityProvider'
         */
        this.router.get('/', (new IdentityProviderController()).findAllProviders);

        /**
         * @swagger
         * /api/identityProviders/{providerId}:
         *   get:
         *     summary: Find one Identity Provider
         *     description: Query an registered Identity Provider by unique ID
         *     tags:
         *       - Identity Provider
         *     parameters:
         *       - in: path
         *         name: providerId
         *         schema:
         *           type: string
         *         required: true
         *         description: Unique ID of Identity Provider
         *     responses:
         *       200:
         *         description: A JSON object of Identity Provider
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               provider:
         *                 $ref: '#/components/schemas/IdentityProvider'
         */
        this.router.get('/:providerId', (new IdentityProviderController()).findOneProvider);

        /**
         * @swagger
         * /api/identityProviders/{providerId}/schemas:
         *   get:
         *     summary: Find all schemas of Identity Provider
         *     description: Query schemas of an registered Identity Provider by unique ID
         *     tags:
         *       - Identity Provider
         *     parameters:
         *       - in: path
         *         name: providerId
         *         schema:
         *           type: string
         *         required: true
         *         description: Unique ID of Identity Provider
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
        this.router.get('/:providerId/schemas', (new IdentityProviderController()).findAllSchemasOfProvider);

        /**
         * @swagger
         * /api/identityProviders/{providerId}/issuers:
         *   get:
         *     summary: Find all issuers of Identity Provider
         *     description: Query issuers of an registered Identity Provider by unique ID
         *     tags:
         *       - Identity Provider
         *     parameters:
         *       - in: path
         *         name: providerId
         *         schema:
         *           type: string
         *         required: true
         *         description: Unique ID of Identity Provider
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
        this.router.get('/:providerId/issuers', (new IdentityProviderController()).findAllIssuersOfProvider);
    }
}