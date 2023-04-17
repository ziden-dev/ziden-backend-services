import { Router } from "express";
import { AuthenController } from "../controllers/AuthenController.js";

export class AuthenRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public route() {
        /**
         * @swagger
         * /api/v1/auth/login/{verifierId}:
         *   post:
         *     summary: Login
         *     description: Get JWZ Token to Login to Verifier Portal
         *     tags:
         *       - Authen
         *     parameters:
         *       - in: path
         *         name: verifierId
         *         description: DID of verifier you want to login to.
         *         required: true
         *         schema:
         *           type: string
         *           example: "1234"
         *     requestBody:
         *       description: You must send your ZKProofs for login to Verifier Portal.
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               proof:
         *                 type: object
         *                 description: Your proof
         *               public_signals:
         *                 type: array
         *                 description: Your Public Signals
         *                 items:
         *                   type: string
         *               circuitId:
         *                 type: string
         *                 description: Circuit Id
         *               schema:
         *                 type: string
         *                 description: SchemaHash of Authen (123456)
         *               algorithm:
         *                 type: string
         *               payload:
         *                 type: string
         *             required:
         *               - proof
         *               - public_signals
         *               - circuitId
         *               - schema
         *               - algorithm
         *               - payload
         *     responses:
         *       '200':
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 token:
         *                   type: string
         *                   description: Your JWZ Token to login to Verifier Potal.
         *                   example: 1234
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
        this.router.post("/login/:verifierId", (new AuthenController()).login);

        /**
         * @swagger
         * /api/v1/auth/verify-token/{verifierId}:
         *   post:
         *     summary: Verify Token
         *     description: Verify a JWZ Token and return true if this token is valid.
         *     tags:
         *       - Authen
         *     parameters:
         *       - in: path
         *         name: verifierId
         *         description: DID of Verifier Portal that you want to login to.
         *         required: true
         *         schema:
         *           type: string
         *           example: "1234"
         *     requestBody:
         *       description: Your JWZ Token
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               token:
         *                 type: string
         *                 description: Your JWZ Token that you want to verify
         *                 example: "1234"
         *             required:
         *              - token
         *     responses:
         *       '200':
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               description: Result check your JWZ Token
         *               properties:
         *                 isValid:
         *                   type: boolean
         *                   description: Return **true** if your JWZ token is valid, else return **false** 
         *                   example: true
         *       '500':
         *         description: Error Resposne
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
        this.router.post("/verify-token/:verifierId", (new AuthenController()).verifyToken);

        /**
         * @swagger
         * /api/v1/auth/proof/{claimId}:
         *   get:
         *     summary: Generate proof input
         *     description: Generate proof input for claim login
         *     tags:
         *       - Authen
         *     parameters:
         *       - in: path
         *         name: claimId
         *         description: Your claimId
         *         required: true
         *         schema:
         *           type: string
         *           example: 1234
         *       - in: query
         *         name: type
         *         description: type in (mtp, nonRevMtp)
         *         required: true
         *         schema:
         *           type: string
         *           default: mtp
         *           enum:
         *             - mtp
         *             - nonRevMtp
         *     responses:
         *       '200':
         *         content:
         *           application/json:
         *             schema:
         *               description: KYC Input
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
        this.router.get("/proof/:claimId", (new AuthenController()).generateProofInput);
    }

}