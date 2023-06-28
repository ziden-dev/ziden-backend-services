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
         *         example: "1234"
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
         *                   description: Claim querry response
         *                   items:
         *                     type: object
         *                     properties:
         *                       claimId:
         *                         type: string
         *                         description: Id of claim
         *                         example: 1234
         *                       status:
         *                         type: string
         *                         description: Claim status
         *                         example: PENDING
         *                       entry:
         *                         type: object
         *                         description: Raw data of Claim
         *                       schema:
         *                         type: object
         *                         description: Claim schema
         *                         properties:
         *                           schemaHash:
         *                             type: string
         *                             description: schema hash
         *                             example: 123456
         *                           name:
         *                             type: string
         *                             description: schema name
         *                             example: KYC
         *                       issuer:
         *                         type: object
         *                         description: Issuer who issue claim
         *                         properties:
         *                           issuerId:
         *                             type: string
         *                             description: DID of Issuer
         *                             example: 1234
         *                           name:
         *                             type: string
         *                             description: Issuer's name
         *                             example: Ziden
         *                           endpointUrl:
         *                             type: string
         *                             description: Issuer Url
         *                             example: ziden.io
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
        this.router.get('/', (new ClaimController()).findClaims);
    }
}