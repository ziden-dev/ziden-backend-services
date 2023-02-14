import { Router } from "express";
import { NetworkController } from "../controllers/NetworkController.js";

export class NetworkRouter {
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
         *     Network:
         *       properties:
         *         chainId:
         *           type: string
         *         name:
         *           type: string
         *         shortName:
         *           type: string
         */

        /**
         * @swagger
         * /api/v1/networks:
         *   get:
         *     summary: Supported Networks
         *     description: Get all supported networks information
         *     tags:
         *       - Network
         *     responses:
         *       '200':
         *         description: An array of verification result
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 networks:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/Network'
         */
        // this.router.get('/', (new NetworkController()).getAllSupportedNetworks);

        /**
         * @swagger
         * /api/v1/networks:
         *   post:
         *     summary: Register Network
         *     description: Register new network
         *     tags:
         *       - Network
         *     requestBody:
         *       description: A JSON of Network
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               network:
         *                 $ref: '#/components/schemas/Network'
         *     responses:
         *       '200':
         *         description: An array of verification result
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 network:
         *                   $ref: '#/components/schemas/Network'
         */
        // this.router.post('/', (new NetworkController()).registerNetwork);
        // this.router.get('/:chainId', (new NetworkController()).findNetworkById);
    }
}