import { Router } from 'express';
import multer from 'multer';

import { UploadMiddleWare } from '../middlewares/UploadMiddleware.js';
import { IssuerController } from '../controllers/IssuerController.js';
import env from '../../lib/env/index.js';

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
         *         name:
         *           type: string
         *           example: Issuer's Name
         *         description:
         *           type: string
         *           example: Issuer's Description
         *         contact:
         *           type: string
         *           example: contact@ziden.io
         *         isVerified:
         *           type: boolean
         *         website:
         *           type: string
         *           example: https://ziden.io
         *         logoUrl:
         *           type: string
         *           example: https://logo.image.url
         *         endpointUrl:
         *           type: string
         *           example: https://issuer.endpoint.url/api/v1/registration
         *     IssuerRegistration:
         *       properties:
         *         issuerId:
         *           type: string
         *         name:
         *           type: string
         *         description:
         *           type: string
         *         contact:
         *           type: string
         *         website:
         *           type: string
         *         issuerLogo:
         *           type: string
         *           format: binary
         *         endpointUrl:
         *           type: string
         */
          
        /**
         * swagger // FIXME
         * components:
         *   schemas:
         *     IssuerProfile:
         *       properties:
         *         name:
         *           type: string
         *         description:
         *           type: string
         *         logo:
         *           type: string
         *         numPublishedClaims:
         *           type: integer
         *         numHolders:
         *           type: integer
         *         contact:
         *           type: string
         *         website:
         *           type: string
         *         endpointUrl:
         *           type: string
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
         *       description: A full JSON object of Issuer registration data
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               issuer:
         *                 $ref: '#/components/schemas/IssuerRegistration'
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
        this.router.post('/', new UploadMiddleWare().use, (new IssuerController()).createIssuer);

        /**
         * @swagger
         * /api/issuers:
         *   get:
         *     summary: Find all Issuer
         *     description: Get all registered Issuers
         *     tags:
         *       - Issuer
         *     parameters:
         *       - in: query
         *         name: schemaHashes
         *         schema:
         *           type: array
         *           items:
         *             type: string
         *         description: Hash of Schema
         *       - in: query
         *         name: networks
         *         schema:
         *           type: array
         *           items: 
         *             type: string
         *         description: Network IDs
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
        this.router.get('/', (new IssuerController()).findIssuers);

        /**
         * swagger // FIXME
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
        // this.router.get('/:issuerId', (new IssuerController()).findOneIssuer);

        /**
         * swagger // FIMXE
         * /api/issuers/{issuerId}:
         *   put:
         *     summary: Update Issuer's Profile
         *     description: Update profile of an Issuer
         *     tags:
         *       - Issuer
         *     parameters:
         *       - in: path
         *         name: issuerId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Issuer
         *     requestBody:
         *       description: Update info
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               issuer:
         *                 type: object
         *                 properties:
         *                   endpointUrl:
         *                     type: string
         *     responses:
         *       200:
         *         description: A JSON object
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 profile:
         *                   type: object
         *                   properties:
         *                     update:
         *                       type: object
         */
        // this.router.put('/:issuerId', (new IssuerController()).updateIssuer);
    }
}