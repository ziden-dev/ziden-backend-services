import { Router } from 'express';
import multer from 'multer';
import env from '../../lib/env/index.js';
import { VerifierController } from '../controllers/VerifierController.js';

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
         *         providerId:
         *           type: string
         *           example: 66555d65-1e87-4428-86c1-35f0e23480f4
         *         endpointUrl:
         *           type: string
         *           example: https://verifier.endpoint.com/api/submit
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
         *       description: A full JSON object of Verifier
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               issuer:
         *                 $ref: '#/components/schemas/Verifier'
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
        this.router.post('/', (new VerifierController()).createVerifier);

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
        this.router.get('/', (new VerifierController()).findAllVerifiers);

        /**
         * @swagger
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
        this.router.get('/:verifierId', (new VerifierController()).findOneVerifier);

        /**
         * @swagger
         * /api/verifiers/{verifierId}/services:
         *   get:
         *     summary: Find Verifier's Services
         *     description: Query all registered services of an Verifier
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
         *                 services:
         *                   type: array
         *                   items:
         *                     type: object
         */
        this.router.get('/:verifierId/services', (new VerifierController()).findVerifierServices);

        /**
         * @swagger
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
        this.router.get('/:verifierId/profile', (new VerifierController()).getVerifierProfile);

        // this.router.put('/:verifierId/profiles', (new VerifierController()).updateVerifierProfile);

        /**
         * @swagger
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
        this.router.get('/:verifierId/operators', (new VerifierController()).findVerifierOperators);

        /**
         * @swagger
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
        this.router.post('/:verifierId/operators', (new VerifierController()).addOperator);

        /**
         * @swagger
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
        this.router.delete('/:verifierId/operators/:operatorId', (new VerifierController()).removeOperator);

        /**
         * @swagger
         * /api/verifiers/register:
         *   post:
         *     summary: Register serverless Verifier
         *     description: Register serverless Verifier
         *     tags:
         *       - Verifier
         *     requestBody:
         *       description: Profile of Verifier
         *       content:
         *         multipart/form-data:
         *           schema:
         *             type: object
         *             properties:
         *               verifierId:
         *                 type: string
         *               name:
         *                 type: string
         *               description:
         *                 type: string
         *               logo:
         *                 type: string
         *                 format: binary
         *               contact:
         *                 type: string
         *               website:
         *                 type: string
         *     responses:
         *       200:
         *         description: A JSON object
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         */
        this.router.post(
            '/register',
            multer({ 
                storage: multer.diskStorage({
                    destination: `.${env.uploads.multerStorageDest}`,
                    filename: function ( req, file, cb ) {
                        cb( null, 'verifier-' + Date.now()+".png");
                    }
                })
            }).single('logo'),
            (new VerifierController).registration
        );
    }
}