import { Router } from 'express';
import { VerifierController } from '../controllers/VerifierController';

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
    }
}