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
         *     summary: API login
         *     description: API login
         *     tags:
         *       - Authen
         *     parameters:
         *       - in: path
         *         name: verifierId
         *         description: DID of verifier
         *         required: true
         *         schema:
         *           type: string
         *     requestBody:
         *       description: Input for login
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               proof:
         *                 type: object
         *               public_signals:
         *                 type: array
         *                 items:
         *                   type: string
         *               circuitId:
         *                 type: string
         *               schema:
         *                 type: string
         *               algorithm:
         *                 type: string
         *               payload:
         *                 type: string
         *     responses:
         *       '200':
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 token:
         *                   type: string
         */
        this.router.post("/login/:verifierId", (new AuthenController()).login);

        /**
         * @swagger
         * /api/v1/auth/verify-token/{verifierId}:
         *   post:
         *     summary: API Verify token
         *     description: API Verify token
         *     tags:
         *       - Authen
         *     parameters:
         *       - in: path
         *         name: verifierId
         *         description: DID of verifier
         *         required: true
         *         schema:
         *           type: string
         *     requestBody:
         *       description: JWZ token
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               token:
         *                 type: string
         *     responses:
         *       '200':
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 isValid:
         *                   type: boolean
         */
        this.router.post("/verify-token/:verifierId", (new AuthenController()).verifyToken);

        /**
         * @swagger
         * /api/v1/auth/proof/{claimId}:
         *   get:
         *     summary: Generate proof input
         *     description: Generate proof input
         *     tags:
         *       - Authen
         *     parameters:
         *       - in: path
         *         name: claimId
         *         description: claimId
         *         required: true
         *         schema:
         *           type: string
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
         *               type: object
         */
        this.router.get("/proof/:claimId", (new AuthenController()).generateProofInput);
    }

}