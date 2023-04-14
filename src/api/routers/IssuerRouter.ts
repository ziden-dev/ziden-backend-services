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
         *           description: DID of Issuer
         *           example: 82701632f563e84bcb34de9542d0457ff5cfb17bf9703f743afb93ba605cc6
         *         name:
         *           type: string
         *           description: Issuer's Name
         *           example: Ziden
         *         description:
         *           type: string
         *           description: Description of Issuer
         *           example: Ziden Dev Issuer
         *         contact:
         *           type: string
         *           description: Email or Phone number of issuer
         *           example: contact@ziden.io
         *         isVerified:
         *           description: Is issuer verified
         *           type: boolean
         *           example: true
         *         website:
         *           type: string
         *           description: Issuer's website
         *           example: https://ziden.io
         *         logoUrl:
         *           type: string
         *           description: Issuer's Logo Url
         *           example: https://logo.image.url
         *         endpointUrl:
         *           type: string
         *           description: Issuer's Url
         *           example: https://issuer.endpoint.url/api/v1/registration
         *     
         *     IssuerRegistration:
         *       description: Registration a Issuer
         *       properties:
         *         issuerId:
         *           type: string
         *           description: DID of Issuer
         *           example: 1234
         *         name:
         *           type: string
         *           description: Issuer's Name
         *           example: Ziden
         *         description:
         *           type: string
         *           description: Description of Issuer
         *           example: Ziden Dev Issuer
         *         contact:
         *           type: string
         *           description: Email or Phone number of issuer
         *           example: contact@ziden.io
         *         website:
         *           type: string
         *           description: Issuer's website
         *           example: https://ziden.io
         *         issuerLogo:
         *           type: string
         *           description: Issuer's Logo
         *           format: binary
         *         endpointUrl:
         *           type: string
         *           example: https://issuer.endpoint.url/api/v1/registration
         *       required:
         *         - issuerId
         *         - name
         *         - description
         *     
         *     SchemaRegistryMetadata:
         *       properties:
         *         registryId:
         *           type: string
         *           description: ID of registry service
         *           example: 1234
         *         name:
         *           type: string
         *           description: Name of registry service
         *           example: Ziden KYC
         *         schemaHash:
         *           type: string
         *           description: Schema Hash
         *           example: 123456
         *         network:
         *           type: string
         *           description: Network Infor
         *           example: bnbt
         *         isActive:
         *           type: boolean
         *           description: Is Registry service Active
         *           example: true
         *   securitySchemes: 
         *       Authorization:
         *         in: header
         *         name: Authorization
         *         type: apiKey
         *         description: JWZ Token
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
         *     summary: Register Issuer
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
         *                 description: DID of Issuer
         *                 example: 123456
         *               name:
         *                 type: string
         *                 description: Issuer's name
         *                 example: Ziden
         *               description:
         *                 type: string
         *                 description: Description about Issuer
         *                 example: Ziden KYC Issuer
         *               contact:
         *                 type: string
         *                 description: Email or Phone number of Issuer
         *                 example: contact@issuer.io
         *               website:
         *                 type: string
         *                 description: Issuer's website
         *                 example: https://issuer.example.io
         *               issuerLogo:
         *                 type: string
         *                 description: Issuer's Logo
         *                 format: binary
         *               endpointUrl:
         *                 type: string
         *                 description: Issuer endpoint Url
         *                 example: https://issuer.endpoint.url/registration
         *             required:
         *              - issuerId
         *              - name
         *              - description
         *              - contact
         *              - website
         *              - issuerLogo
         *              - endpointUrl
         *     responses:
         *       '200':
         *         description: A JSON object of Issuer
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 issuer:
         *                   $ref: '#/components/schemas/Issuer'
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
         *         description: Schema Hash
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
         *                       - type: object
         *                         properties: 
         *                            schemaRegistries:
         *                               type: array
         *                               items:
         *                                  $ref: '#/components/schemas/SchemaRegistryMetadata'
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
         *           example: 1234
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
        this.router.get('/:issuerId', (new IssuerController()).findOneIssuer);

        /**
         * @swagger
         * /api/v1/issuers/{issuerId}:
         *   post:
         *     security:
         *       - Authorization: []
         *     summary: Update Issuer's Profile
         *     description: Update profile of an Issuer
         *     tags:
         *       - Issuer
         *     parameters:
         *       - in: path
         *         name: issuerId
         *         schema:
         *           type: string
         *           example: 1234
         *         required: true
         *         description: DID of Issuer
         *     requestBody:
         *       description: A form data of Issuer registration data
         *       content:
         *         multipart/form-data:
         *           schema:
         *             properties:
         *               name:
         *                 type: string
         *                 description: Issuer's name
         *                 example: Ziden
         *               description:
         *                 type: string
         *                 description: Description about Issuer
         *                 example: Ziden KYC Issuer
         *               contact:
         *                 type: string
         *                 description: Email or Phone number of Issuer
         *                 example: contact@issuer.io
         *               website:
         *                 type: string
         *                 description: Issuer's website
         *                 example: https://issuer.example.io
         *               issuerLogo:
         *                 type: string
         *                 description: Issuer's Logo
         *                 format: binary
         *               endpointUrl:
         *                 type: string
         *                 description: Issuer endpoint Url
         *                 example: https://issuer.endpoint.url/registration
         *             required:
         *              - issuerId
         *              - name
         *              - description
         *              - contact
         *              - website
         *              - issuerLogo
         *              - endpointUrl
         *     responses:
         *       200:
         *         description: A JSON object
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 _id:
         *                    type: string
         *                    description: DID of Issuer
         *                    example: 1234
         *                 name:
         *                    type: string
         *                    description: Issuer's name
         *                    example: Ziden
         *                 description:
         *                    type: string
         *                    description: Description about Issuer
         *                    example: Ziden KYC Issuer
         *                 contact:
         *                    type: string
         *                    description: Email or Phone number of Issuer
         *                    example: contact@issuer.io
         *                 isVerified:
         *                    type: string
         *                    description: Is Issuer verified?
         *                 website:
         *                    type: string
         *                    description: Issuer's website
         *                    example: https://issuer.example.io
         *                 logoUrl:
         *                    type: string
         *                    description: Issuer's Logo Url
         *                    example: https://issuer.logo.image
         *                 endpointUrl:
         *                    type: string
         *                    description: Issuer endpoint Url
         *                    example: https://issuer.endpoint.url/registrat
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
        this.router.post('/:issuerId', new UploadMiddleWare().use, (new IssuerController()).updateIssuer);
    }
}