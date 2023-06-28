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
         *           description: network chain id
         *           type: integer
         *           example: 97
         *         name:
         *           type: string
         *           description: network name
         *           example: BNB Testnet
         *         type:
         *           type: string
         *           description: type of network
         *           example: EVM
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
        this.router.get('/', (new NetworkController()).getAllSupportedNetworks);

        /**
         * @swagger
         * /api/v1/networks/{networkId}:
         *   get:
         *     summary: Get network information
         *     description: Get network information by networkId
         *     tags:
         *       - Network
         *     parameters:
         *       - in: path
         *         name: networkId
         *         schema:
         *           type: string
         *           example: 97
         *         required: true
         *         description: network chain id
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
        this.router.get('/:chainId', (new NetworkController()).findNetworkById);
    }
}