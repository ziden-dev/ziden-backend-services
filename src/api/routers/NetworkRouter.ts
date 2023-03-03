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
         *         description: Array of Network
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
        this.router.get('/', (new NetworkController()).getAllSupportedNetworks);

        /**
         * @swagger
         * /api/v1/networks/{networkId}:
         *   get:
         *     summary: Register Network
         *     description: Register new network
         *     tags:
         *       - Network
         *     parameters:
         *       - in: path
         *         name: networkId
         *         schema:
         *           type: string
         *         required: true
         *         description: Network ID
         *     responses:
         *       '200':
         *         description: JSON object of Network
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 network:
         *                   $ref: '#/components/schemas/Network'
         */
        this.router.get('/:chainId', (new NetworkController()).findNetworkById);
    }
}