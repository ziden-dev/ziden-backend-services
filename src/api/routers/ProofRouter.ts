import { Router } from 'express';
import { ProofController } from '../controllers/ProofController.js';

export class ProofRouter {
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
         *     Proof:
         *       properties:
         *         proof:
         *           type: object
         *           description: Your ZK Proof
         *         publicData:
         *           type: array
         *           items:
         *             type: string
         *             description: Your Public Signals
         *       required:
         *           - proof
         *           - publicData
         *     ProofRequest:
         *       properties:
         *         requestId:
         *           type: string
         *           description: Id of request
         *           example: 1234
         *         serviceId:
         *           type: string
         *           description: Id of service
         *           example: 1234
         *         message:
         *           type: string
         *           description: Sign this message to provide proof
         *           example: 1234
         *         validUntil:
         *           type: string
         *           format: date-time
         *           description: Expiration date of Proof
         *           example: 2023-02-13T02:55:39.667+00:00
         *         zkProofs:
         *           type: array
         *           items:
         *             $ref: '#/components/schemas/Proof'
         */

        /**
         * @swagger
         * /api/v1/proofs/submit:
         *   post:
         *     summary: Submit ZK Proof
         *     description: Submit ZK proofs for verification
         *     tags:
         *       - Proof
         *     requestBody:
         *       description: A JSON array of Proof
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               requestId:
         *                 type: string
         *                 description: Id of request
         *               zkProofs:
         *                 type: array
         *                 items:
         *                   $ref: '#/components/schemas/Proof'
         *             required:
         *                 - requestId
         *                 - zkProofs
         *     responses:
         *       '200':
         *         description: An array of verification result
         *         content:
         *           application/json:
         *             schema:
         *                type: object
         *                properties:
         *                  isValid:
         *                    type: boolean
         *                    description: Result Verify all ZK Proofs
         *                    example: true
         *                  results:
         *                    type: array
         *                    items:
         *                       type: boolean
         *                       description: Result Verify each Proof in Array ZK Proof
         *                       example: true
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
        this.router.post('/submit', (new ProofController()).submitProofs);

        /**
         * @swagger
         * /api/v1/proofs/verify:
         *   post:
         *     summary: Verify ZK Proof
         *     description: Verify Your ZK Proof
         *     tags:
         *       - Proof
         *     requestBody:
         *       description: A JSON array of Proof
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               networkId:
         *                 type: string
         *                 description: Network Chain Id you want to verify in
         *               zkProofs:
         *                 type: array
         *                 description: Array of ZK Proof
         *                 items:
         *                   $ref: '#/components/schemas/Proof'
         *             required:
         *                - networkId
         *                - zkProofs
         *     responses:
         *       '200':
         *         description: An array of verification result
         *         content:
         *           application/json:
         *             schema:
         *                type: object
         *                properties:
         *                  isValid:
         *                    type: boolean
         *                    description: Result Verify all ZK Proofs
         *                    example: true
         *                  results:
         *                    type: array
         *                    items:
         *                       type: boolean
         *                       description: Result Verify each Proof in Array ZK Proof
         *                       example: true
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
        this.router.post('/verify', (new ProofController()).verifyProofs);

        /**
         * @swagger
         * /api/v1/proofs/{requestId}:
         *   get:
         *     summary: Fetch ZK proof
         *     description: Fetch ZK proof for a request
         *     tags:
         *       - Proof
         *     parameters:
         *       - in: path
         *         name: requestId
         *         schema:
         *           type: string
         *         required: true
         *         description: Unique ID of a request
         *     responses:
         *       200:
         *         description: A JSON of proof request
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 request:
         *                   $ref: '#/components/schemas/ProofRequest'
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
        this.router.get('/:requestId', (new ProofController()).fetchProofRequest);

        /**
         * @swagger
         * /api/v1/proofs/request:
         *   post:
         *     summary: Generate ZK proof request
         *     description: Generate request for ZK proof generation
         *     tags:
         *       - Proof
         *     requestBody:
         *       description: Data for generating proof generation request
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               serviceId:
         *                 type: string
         *                 description: Unique ID of Service
         *                 example: 1234
         *             required:
         *               - serviceId
         *     responses:
         *       200:
         *         description: Unique ID of Request
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 request:
         *                   type: object
         *                   properties:
         *                      requestId:
         *                          type: string
         *                          description: Id of request
         *                          example: 1234
         *                      serviceId:
         *                          type: string
         *                          description: Id of service
         *                          example: 1234
         *                      message:
         *                          type: string
         *                          description: Sign this message to provide proof
         *                          example: 1234
         *                      validUntil:
         *                          type: string
         *                          format: date-time
         *                          description: Expiration date of Proof
         *                          example: 2023-02-13T02:55:39.667+00:00
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
        this.router.post('/request', (new ProofController()).generateProofRequest);
    }
}