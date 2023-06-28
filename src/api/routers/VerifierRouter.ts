import { Router } from 'express';
import multer from 'multer';

import { UploadMiddleWare } from '../middlewares/UploadMiddleware.js';
import { VerifierController } from '../controllers/VerifierController.js';
import env from '../../lib/env/index.js';
import { OperatorController } from '../controllers/OperatorController.js';
import { AuthenController } from '../controllers/AuthenController.js';

export class VerifierRouter {
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
         *     Verifier:
         *       properties:
         *         _id:
         *           type: string
         *           example: 82701632f563e84bcb34de9542d0457ff5cfb17bf9703f743afb93ba605cc6
         *           description: DID of Verifier
         *         name:
         *           type: string
         *           example: Verifier's Name
         *           description: Verifier's name
         *         description:
         *           type: string
         *           example: Verifier's Description
         *           description: Description about Verifier
         *         contact:
         *           type: string
         *           example: contact@ziden.io
         *           description: Email or Phone number of Verifier
         *         isVerified:
         *           type: boolean
         *           description: Is verified?
         *           example: true
         *         website:
         *           type: string
         *           example: https://ziden.io
         *           description: Verifier's website
         *         logoUrl:
         *           type: string
         *           example: https://logo.image.url
         *           description: Vefifier's Logo Url
         *     VerifierRegistration:
         *       properties:
         *         verifierId:
         *           type: string
         *           description: Verifier's DID
         *           example: 1234
         *         name:
         *           type: string
         *           example: Verifier's Name
         *           description: Verifier's name
         *         description:
         *           type: string
         *           example: Verifier's Description
         *           description: Description about Verifier
         *         contact:
         *           type: string
         *           example: contact@ziden.io
         *           description: Email or Phone number of Verifier
         *         website:
         *           type: string
         *           example: https://ziden.io
         *           description: Verifier's website
         *         verifierLogo:
         *           type: string
         *           format: binary
         *           description: Verifier's Logo
         *   securitySchemes: 
         *       Authorization:
         *         in: header
         *         name: Authorization
         *         type: apiKey
         *         description: JWZ Token
         */

        /**
         * swagger // FIXME
         *   schemas:
         *     VerifierProfile:
         *       properties:
         *         name:
         *           type: string
         *         description:
         *           type: string
         *         logo:
         *           type: string
         *         contact:
         *           type: string
         *         website:
         *           type: string
         *         endpointUrl:
         *           type: string
         */

        /**
         * @swagger
         * /api/v1/verifiers/registration:
         *   post:
         *     summary: Create new Verifier
         *     description: Register new Verifier
         *     tags:
         *       - Verifier
         *     requestBody:
         *       description: A full JSON object of Verifier registration data
         *       content:
         *         multipart/form-data:
         *           schema:
         *             type: object
         *             properties:
         *                 verifierId:
         *                      type: string
         *                      description: Verifier's DID
         *                      example: 1234
         *                 name:
         *                      type: string
         *                      example: Verifier's Name
         *                      description: Verifier's name
         *                 description:
         *                      type: string
         *                      example: Verifier's Description
         *                      description: Description about Verifier
         *                 contact:
         *                      type: string
         *                      example: contact@ziden.io
         *                      description: Email or Phone number of Verifier
         *                 website:
         *                      type: string
         *                      example: https://ziden.io
         *                      description: Verifier's website
         *                 verifierLogo:
         *                      type: string
         *                      format: binary
         *                      description: Verifier's Logo
         *             required:
         *                 - verifierId
         *                 - name
         *                 - description
         *                 - contact
         *                 - website
         *                 - verifierLogo
         *     responses:
         *       '200':
         *         description: A JSON object of Verifier
         *         content:
         *           application/json:
         *             schema:
         *              type: object
         *              properties:
         *               newVerifier:
         *                 $ref: '#/components/schemas/Verifier'
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
        this.router.post('/registration', new UploadMiddleWare().use, (new VerifierController()).registration);

        /**
         * @swagger
         * /api/v1/verifiers:
         *   get:
         *     summary: Find all Verifier
         *     description: Get all registered Verifier
         *     tags:
         *       - Verifier
         *     parameters:
         *       - in: query
         *         name: operatorId
         *         schema:
         *           type: string
         *           example: 1234
         *         description: get verifier services by operatorId
         *     responses:
         *       200:
         *         description: A JSON array of Verifier
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 verifiers:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/Verifier'
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
        this.router.get('/', (new VerifierController()).findVerifiers);

        /**
         * @swagger
         * /api/v1/verifiers/{verifierId}:
         *   get:
         *     summary: Find one Verifier
         *     description: Query an registered Verifier by DID
         *     tags:
         *       - Verifier
         *     parameters:
         *       - in: path
         *         name: verifierId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Verifier
         *         example: 12345
         *     responses:
         *       200:
         *         description: A JSON object of Verifier
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 verifier:
         *                   $ref: '#/components/schemas/Verifier'
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
        this.router.get('/:verifierId', (new VerifierController()).findOneVerifier);

        /**
         * swagger // FIXME
         * /api/v1/verifiers/{verifierId}/profile:
         *   get:
         *     summary: Find Verifier's Profile
         *     description: Query profile of an Verifier
         *     tags:
         *       - Verifier
         *     parameters:
         *       - in: path
         *         name: verifierId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Verifier
         *     responses:
         *       200:
         *         description: A JSON object
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 profile:
         *                   $ref: '#/components/schemas/VerifierProfile'
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
        // this.router.get('/:verifierId/profile', (new VerifierController()).getVerifierProfile);
        
        /**
         * @swagger
         * /api/v1/verifiers/{verifierId}/profiles:
         *   put:
         *     security:
         *       - Authorization: []
         *     summary: Update verifier profile
         *     description: Update verifier's information
         *     tags:
         *       - Verifier
         *     parameters:
         *       - in: path
         *         name: verifierId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Verifier
         *         example: 1234
         *     requestBody:
         *       description: A full JSON object of Verifier registration data
         *       content:
         *         multipart/form-data:
         *           schema:
         *             type: object
         *             properties:
         *                 name:
         *                      type: string
         *                      example: Verifier's Name
         *                      description: Verifier's name
         *                 description:
         *                      type: string
         *                      example: Verifier's Description
         *                      description: Description about Verifier
         *                 contact:
         *                      type: string
         *                      example: contact@ziden.io
         *                      description: Email or Phone number of Verifier
         *                 website:
         *                      type: string
         *                      example: https://ziden.io
         *                      description: Verifier's website
         *                 verifierLogo:
         *                      type: string
         *                      format: binary
         *                      description: Verifier's Logo
         *             required:
         *                 - name
         *                 - description
         *                 - contact
         *                 - website
         *                 - verifierLogo
         *     responses:
         *       '200':
         *         description: A JSON object of Verifier
         *         content:
         *           application/json:
         *             schema:
         *              type: object
         *              properties:
         *               newVerifier:
         *                 $ref: '#/components/schemas/Verifier'
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
        this.router.put('/:verifierId/profiles', [new UploadMiddleWare().use, (new AuthenController()).authorizationAdmin], (new VerifierController()).updateVerifierProfile);

        /**
         * @swagger
         * /api/v1/verifiers/{verifierId}/operators:
         *   get:
         *     summary: Find Verifier's Operators
         *     description: Query all operators of an Verifier
         *     tags:
         *       - Verifier
         *     parameters:
         *       - in: path
         *         name: verifierId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Verifier
         *     responses:
         *       200:
         *         description: A JSON object
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 operators:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       operatorId:
         *                         type: string
         *                         description: DID of Operator
         *                         example: 12345
         *                       createdAt:
         *                         type: string
         *                         format: date
         *                         description: Timestamp Operator created
         *                         example: '2023-03-22T08:01:35.099+00:00'
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
        this.router.get('/:verifierId/operators', (new OperatorController()).getAllOperators);

        /**
         * @swagger
         * /api/v1/verifiers/{verifierId}/operators:
         *   post:
         *     security:
         *       - Authorization: []
         *     summary: Add a Operator
         *     description: Add new Operator for an Verifier
         *     tags:
         *       - Verifier
         *     parameters:
         *       - in: path
         *         name: verifierId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Verifier
         *         example: 1234
         *     requestBody:
         *       description: DID of Operator
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               operatorId:
         *                 type: string
         *                 example: 1234
         *                 description: DID of Operator
         *             required:
         *               - operatorId
         *     responses:
         *       200:
         *         description: A JSON object of Operator
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 operatorId:
         *                   type: string
         *                 createdAt:
         *                   type: string
         *                   format: date
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
        this.router.post('/:verifierId/operators', (new AuthenController()).authorizationAdmin, (new OperatorController()).createOperator);

        /**
         * @swagger 
         * /api/v1/verifiers/{verifierId}/operators/{operatorId}:
         *   delete:
         *     security:
         *       - Authorization: []
         *     summary: Remove a Operator
         *     description: Remove existing Operator for an Verifier
         *     tags:
         *       - Verifier
         *     parameters:
         *       - in: path
         *         name: verifierId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Verifier
         *         example: 1234
         *       - in: path
         *         name: operatorId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of OperatorId
         *         example: 12345
         *     responses:
         *       200:
         *         description: A JSON object of Operator
         *         content:
         *           application/json:
         *             schema:
         *               type: object
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
        this.router.delete('/:verifierId/operators/:operatorId', (new AuthenController()).authorizationAdmin, (new OperatorController()).removeOperator);

        /**
         * @swagger 
         * /api/v1/verifiers/{verifierId}/operators/{operatorId}:
         *   get:
         *     summary: Get operator infor
         *     description: Get Operator information
         *     tags:
         *       - Verifier
         *     parameters:
         *       - in: path
         *         name: verifierId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Verifier
         *         example: 1234
         *       - in: path
         *         name: operatorId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of OperatorId
         *         example: 12345
         *     responses:
         *       200:
         *         description: A JSON object of Operator
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 userId:
         *                   type: string
         *                   description: DID of User
         *                   example: 1234
         *                 verifierId:
         *                   type: string
         *                   description: DID of Verifier
         *                   example: 1234      
         *                 claimId:
         *                   type: string
         *                   description: Unique Id of Claim
         *                   example: 1234
         *                 version:
         *                   type: integer
         *                   description: Version of claim
         *                   example: 1
         *                 revNonce:
         *                   type: integer
         *                   description: Revocation nonce of claim
         *                   example: 10
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
         *                 
         */
        this.router.get('/:verifierId/operators/:operatorId', (new OperatorController()).getOperatorInfor);
    }
}