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
         *         publicData:
         *           type: array
         *           items:
         *             type: object
         *     ProofRequest:
         *       properties:
         *         requestId:
         *           type: string
         *         serviceId:
         *           type: string
         *         message:
         *           type: string
         *         validUntil:
         *           type: string
         *           format: date-time
         *         proofs:
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
         *               proofs:
         *                 type: array
         *                 items:
         *                   $ref: '#/components/schemas/Proof'
         *     responses:
         *       '200':
         *         description: An array of verification result
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               isValid:
         *                 type: boolean
         *               results:
         *                 type: array
         *                 items:
         *                   type: boolean
         */
        this.router.post('/submit', (new ProofController()).submitProofs);

        /**
         * @swagger
         * /api/v1/proofs/verify:
         *   post:
         *     summary: Verify ZK Proof
         *     description: Verify ZK proofs
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
         *               proofs:
         *                 type: array
         *                 items:
         *                   $ref: '#/components/schemas/Proof'
         *     responses:
         *       '200':
         *         description: An array of verification result
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               isValid:
         *                 type: boolean
         *               results:
         *                 type: array
         *                 items:
         *                   type: boolean
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
         *                 required: true
         *     responses:
         *       200:
         *         description: Unique ID of Request
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 request:
         *                   $ref: '#/components/schemas/ProofRequest'
         */
        this.router.post('/request', (new ProofController()).generateProofRequest);
    }
}