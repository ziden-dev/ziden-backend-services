import { Router } from 'express';
import { ProofController } from '../controllers/ProofController';

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
         */

        /**
         * @swagger
         * /api/proofs/submit:
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
         *               zkProofs:
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
         *               results:
         *                 type: array
         *                 items:
         *                   type: boolean
         */
        this.router.post('/submit', (new ProofController()).submitProofs);

        /**
         * @swagger
         * /api/proofs/requests/{serviceId}:
         *   get:
         *     summary: Fetch ZK proof request
         *     description: Fetch request for ZK proof generation
         *     tags:
         *       - Proof
         *     parameters:
         *       - in: path
         *         name: serviceId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Issuer
         *     responses:
         *       200:
         *         description: A JSON of proof request
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         */
        this.router.get('/requests/:serviceId', (new ProofController()).getProofRequest);

        /**
         * @swagger
         * /api/proofs/public:
         *   get:
         *     summary: Fetch public data
         *     description: Fetch necessary public data for ZK proof generation
         *     tags:
         *       - Proof
         *     parameters:
         *       - in: query
         *         name: issuerId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Issuer
         *       - in: query
         *         name: claimId
         *         schema:
         *           type: string
         *         required: true
         *         description: Unique ID of claim
         *     responses:
         *       200:
         *         description: A JSON of public data
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         */
        this.router.get('/public', (new ProofController()).getProofPublicData);
    }
}