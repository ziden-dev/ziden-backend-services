import { Router } from 'express';
import multer from 'multer';

import { UploadMiddleWare } from '../middlewares/UploadMiddleware.js';
import { VerifierController } from '../controllers/VerifierController.js';
import env from '../../lib/env/index.js';

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
         *         name:
         *           type: string
         *           example: Verifier's Name
         *         description:
         *           type: string
         *           example: Verifier's Description
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
         *     VerifierRegistration:
         *       properties:
         *         verifierId:
         *           type: string
         *         name:
         *           type: string
         *         description:
         *           type: string
         *         contact:
         *           type: string
         *         website:
         *           type: string
         *         verifierLogo:
         *           type: string
         *           format: binary
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
         * /api/verifiers:
         *   post:
         *     summary: Create new Verifier
         *     description: Register new Verifier
         *     tags:
         *       - Verifier
         *     requestBody:
         *       description: A full JSON object of Verifier registration data
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               issuer:
         *                 $ref: '#/components/schemas/VerifierRegistration'
         *     responses:
         *       '200':
         *         description: A JSON object of Verifier
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               newVerifier:
         *                 $ref: '#/components/schemas/Verifier'
         */
        this.router.post('/', new UploadMiddleWare().use, (new VerifierController()).createVerifier);

        /**
         * @swagger
         * /api/verifiers:
         *   get:
         *     summary: Find all Verifier
         *     description: Get all registered Verifier
         *     tags:
         *       - Verifier
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
         */
        this.router.get('/', (new VerifierController()).findVerifiers);

        /**
         * swagger // FIXME
         * /api/verifiers/{verifierId}:
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
         */
        // this.router.get('/:verifierId', (new VerifierController()).findOneVerifier);

        /**
         * swagger // FIXME
         * /api/verifiers/{verifierId}/profile:
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
         */
        // this.router.get('/:verifierId/profile', (new VerifierController()).getVerifierProfile);

        // this.router.put('/:verifierId/profiles', (new VerifierController()).updateVerifierProfile);

        /**
         * swagger // FIXME
         * /api/verifiers/{verifierId}/operators:
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
         *                       createdAt:
         *                         type: string
         *                         format: date
         */
        // this.router.get('/:verifierId/operators', (new VerifierController()).findVerifierOperators);

        /**
         * swagger // FIXME
         * /api/verifiers/{verifierId}/operators:
         *   post:
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
         *     requestBody:
         *       description: DID of Operator
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               operatorId:
         *                 type: string
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
         */
        // this.router.post('/:verifierId/operators', (new VerifierController()).addOperator);

        /**
         * swagger // FIXME
         * /api/verifiers/{verifierId}/operators/{operatorId}:
         *   delete:
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
         *       - in: path
         *         name: operatorId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of OperatorId
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
         */
        // this.router.delete('/:verifierId/operators/:operatorId', (new VerifierController()).removeOperator);

    }
}