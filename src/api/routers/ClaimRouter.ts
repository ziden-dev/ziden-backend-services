import { Router } from "express";
import { ClaimController } from "../controllers/ClaimController.js";

export class ClaimRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public route() {

        /**
         * @swagger
         * /api/v1/claims:
         *   get:
         *     summary: Query claims
         *     description: Fetch claim's data
         *     tags:
         *       - Claim
         *     parameters:
         *       - in: query
         *         name: holderId
         *         schema:
         *           type: string
         *         description: DID of Holder
         *       - in: query
         *         name: issuerId
         *         schema:
         *           type: string
         *         description: DID of Issuer
         *       - in: query
         *         name: claimIds
         *         schema:
         *           type: array
         *           items:
         *             type: string
         *         description: Unique ID of claims
         *     responses:
         *       200:
         *         description: A JSON object
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 claims:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       claimId:
         *                         type: string
         *                       status:
         *                         type: string
         *                       entry:
         *                         type: object
         *                       schema:
         *                         type: object
         *                         properties:
         *                           schemaHash:
         *                             type: string
         *                           name:
         *                             type: string
         *                       issuer:
         *                         type: object
         *                         properties:
         *                           issuerId:
         *                             type: string
         *                           name:
         *                             type: string
         *                           endpointUrl:
         *                             type: string
         */
        this.router.get('/', (new ClaimController()).findClaims);
    }
}