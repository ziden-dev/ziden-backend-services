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
         * /api/claims/metadata:
         *   get:
         *     summary: Query claims
         *     description: Fetch claim's data
         *     tags:
         *       - Claim
         *     parameters:
         *       - in: query
         *         name: issuerId
         *         schema:
         *           type: string
         *         description: DID of Issuer
         *       - in: query
         *         name: claimId
         *         schema:
         *           type: string
         *         description: Unique ID of a claim
         *       - in: query
         *         name: holderId
         *         schema:
         *           type: string
         *         description: Hash of schema
         *       - in: query
         *         name: status
         *         schema:
         *           type: string
         *         description: CLAIMED or UNCLAIMED
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
         *                           title:
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