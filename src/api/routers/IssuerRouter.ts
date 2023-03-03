import { Router } from 'express';

import { UploadMiddleWare } from '../middlewares/UploadMiddleware.js';
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
         *         issuerId:
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
         *     
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
         *     
         *     SchemaRegistryMetadata:
         *       properties:
         *         registryId:
         *           type: string
         *         name:
         *           type: string
         *         schemaHash:
         *           type: string
         *         network:
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
         * /api/v1/issuers/registration:
         *   post:
         *     summary: Create new Issuer
         *     description: Register new Issuer
         *     tags:
         *       - Issuer
         *     requestBody:
         *       description: A form data of Issuer registration data
         *       content:
         *         multipart/form-data:
         *           schema:
         *             type: object       
         *             properties:
         *               issuerId:
         *                 type: string
         *                 required: true
         *               name:
         *                 type: string
         *                 required: true
         *               description:
         *                 type: string
         *                 required: true
         *               contact:
         *                 type: string
         *                 required: true
         *               website:
         *                 type: string
         *                 required: true
         *               issuerLogo:
         *                 type: string
         *                 format: binary
         *                 required: true
         *               endpointUrl:
         *                 type: string
         *                 required: true
         *     responses:
         *       '200':
         *         description: A JSON object of Issuer
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               newIssuer:
         *                 type: object
         *                 $ref: '#/components/schemas/Issuer'
         */
        this.router.post('/registration', new UploadMiddleWare().use, (new IssuerController()).registration);

        /**
         * @swagger
         * /api/v1/issuers:
         *   get:
         *     summary: Find all Issuer
         *     description: Get all registered Issuers
         *     tags:
         *       - Issuer
         *     parameters:
         *       - in: query
         *         name: schemaHash
         *         schema:
         *           type: string
         *         description: Hash of Schema
         *       - in: query
         *         name: networkId
         *         schema:
         *           type: string
         *         description: Network ID
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
         *                     allOf:
         *                       - $ref: '#/components/schemas/Issuer'
         *                       - schemaRegistries:
         *                           type: array
         *                           items:
         *                             $ref: '#/components/schemas/SchemaRegistryMetadata'
         */
        this.router.get('/', (new IssuerController()).findIssuers);

        /**
         * @swagger
         * /api/v1/issuers/{issuerId}:
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

        /**
         * @swagger
         * /api/v1/issuers/{issuerId}:
         *   post:
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
         *       description: A form data of Issuer registration data
         *       content:
         *         multipart/form-data:
         *           schema:
         *             type: object       
         *             properties:
         *               name:
         *                 type: string
         *               description:
         *                 type: string
         *               contact:
         *                 type: string
         *               website:
         *                 type: string
         *               issuerLogo:
         *                 type: string
         *                 format: binary
         *               endpointUrl:
         *                 type: string
         *     responses:
         *       200:
         *         description: A JSON object
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         */
        this.router.post('/:issuerId', new UploadMiddleWare().use, (new IssuerController()).updateIssuer);
    }
}