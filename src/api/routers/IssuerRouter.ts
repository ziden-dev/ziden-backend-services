import { Router } from 'express';
import multer from 'multer';

import { IssuerController } from '../controllers/IssuerController.js';
import env from '../../lib/env/index.js';

export class IssuerRouter {
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
         *     Issuer:
         *       properties:
         *         _id:
         *           type: string
         *           example: 82701632f563e84bcb34de9542d0457ff5cfb17bf9703f743afb93ba605cc6
         *         providerId:
         *           type: string
         *           example: 66555d65-1e87-4428-86c1-35f0e23480f4
         *         endpointUrl:
         *           type: string
         *           example: https://issuer.endpoint.com/api/registration
         *         supportedNetworks:
         *           type: array
         *           items:
         *             type: string
         *     IssuerProfile:
         *       properties:
         *         name:
         *           type: string
         *         description:
         *           type: string
         *         logo:
         *           type: string
         *         numPublishedClaims:
         *           type: integer
         *         numHolders:
         *           type: integer
         *         contact:
         *           type: string
         *         website:
         *           type: string
         *         endpointUrl:
         *           type: string
         *     IssuerRegistration:
         *       properties:
         *         name:
         *           type: string
         *         description:
         *           type: string
         *         logo:
         *           type: string
         *           format: binary
         *         contact:
         *           type: string
         *         website:
         *           type: string
         *         endpointUrl:
         *           type: string
         */

        /**
         * @swagger
         * /api/issuers:
         *   post:
         *     summary: Create new Issuer
         *     description: Register new Issuer
         *     tags:
         *       - Issuer
         *     requestBody:
         *       description: A full JSON object of Issuer
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               issuer:
         *                 $ref: '#/components/schemas/Issuer'
         *     responses:
         *       '200':
         *         description: A JSON object of Issuer
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               newIssuer:
         *                 $ref: '#/components/schemas/Issuer'
         */
        this.router.post('/', (new IssuerController()).createIssuer);

        /**
         * @swagger
         * /api/issuers:
         *   get:
         *     summary: Find all Issuer
         *     description: Get all registered Issuers
         *     tags:
         *       - Issuer
         *     parameters:
         *       - in: query
         *         name: schemaHashes
         *         schema:
         *           type: array
         *           items:
         *             type: string
         *         description: Hash of Schema
         *       - in: query
         *         name: networks
         *         schema:
         *           type: array
         *           items: 
         *             type: string
         *         description: Network IDs
         *     responses:
         *       200:
         *         description: A JSON array of Issuer
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 issuers:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/Issuer'
         */
        this.router.get('/', (new IssuerController()).findAllIssuers);

        /**
         * @swagger
         * /api/issuers/{issuerId}:
         *   get:
         *     summary: Find one Issuer
         *     description: Query an registered Issuer by DID
         *     tags:
         *       - Issuer
         *     parameters:
         *       - in: path
         *         name: issuerId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Issuer
         *     responses:
         *       200:
         *         description: A JSON object of Issuer
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 issuer:
         *                   $ref: '#/components/schemas/Issuer'
         */
        this.router.get('/:issuerId', (new IssuerController()).findOneIssuer);

        /**
         * @swagger
         * /api/issuers/{issuerId}/schemas:
         *   get:
         *     summary: Find Issuer's Schemas
         *     description: Query all registered schemas of an Issuer
         *     tags:
         *       - Issuer
         *     parameters:
         *       - in: path
         *         name: issuerId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Issuer
         *     responses:
         *       200:
         *         description: A JSON object of Schemas
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 registryId:
         *                   type: string
         *                 title:
         *                   type: string
         *                 schemaHash:
         *                   type: string
         *                 numPublishedClaims:
         *                   type: string
         *                 createdAt:
         *                   type: string
         *                 active:
         *                   type: string
         */
        this.router.get('/:issuerId/schemas', (new IssuerController()).findIssuerSchemas);

        /**
         * @swagger
         * /api/issuers/{issuerId}/profile:
         *   get:
         *     summary: Find Issuer's Profile
         *     description: Query profile of an Issuer
         *     tags:
         *       - Issuer
         *     parameters:
         *       - in: path
         *         name: issuerId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Issuer
         *     responses:
         *       200:
         *         description: A JSON object
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 profile:
         *                   $ref: '#/components/schemas/IssuerProfile'
         */
        this.router.get('/:issuerId/profile', (new IssuerController()).getIssuerProfile);

        /**
         * @swagger
         * /api/issuers/{issuerId}/profile:
         *   put:
         *     summary: Update Issuer's Profile
         *     description: Update profile of an Issuer
         *     tags:
         *       - Issuer
         *     parameters:
         *       - in: path
         *         name: issuerId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Issuer
         *     requestBody:
         *       description: Update info
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               issuer:
         *                 type: object
         *                 properties:
         *                   endpointUrl:
         *                     type: string
         *     responses:
         *       200:
         *         description: A JSON object
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 profile:
         *                   type: object
         *                   properties:
         *                     update:
         *                       type: object
         */
        this.router.put('/:issuerId/profile', (new IssuerController()).updateIssuerProfile);
        
        /**
         * @swagger
         * /api/issuers/{issuerId}/operators:
         *   post:
         *     summary: Add a Operator
         *     description: Add new Operator for an Issuer
         *     tags:
         *       - Issuer
         *     parameters:
         *       - in: path
         *         name: issuerId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Issuer
         *     requestBody:
         *       description: DID of Operator
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               operatorId:
         *                 type: string
         *     responses:
         *       200:
         *         description: A JSON object of Operator
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 operatorId:
         *                   type: string
         *                 createdAt:
         *                   type: string
         *                   format: date
         */
        this.router.post('/:issuerId/operators', (new IssuerController()).addOperator);

        /**
         * @swagger
         * /api/issuers/{issuerId}/operators:
         *   get:
         *     summary: Find Issuer's Operators
         *     description: Query all operators of an Issuer
         *     tags:
         *       - Issuer
         *     parameters:
         *       - in: path
         *         name: issuerId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Issuer
         *     responses:
         *       200:
         *         description: A JSON object
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 operators:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       operatorId:
         *                         type: string
         *                       createdAt:
         *                         type: string
         *                         format: date
         */
        this.router.get('/:issuerId/operators', (new IssuerController()).findIssuerOperators);

        /**
         * @swagger
         * /api/issuers/{issuerId}/operators/{operatorId}:
         *   delete:
         *     summary: Remove a Operator
         *     description: Remove existing Operator for an Issuer
         *     tags:
         *       - Issuer
         *     parameters:
         *       - in: path
         *         name: issuerId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Issuer
         *       - in: path
         *         name: operatorId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of OperatorId
         *     responses:
         *       200:
         *         description: A JSON object of Operator
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 operatorId:
         *                   type: string
         *                 createdAt:
         *                   type: string
         *                   format: date
         */
        this.router.delete('/:issuerId/operators/:operatorId', (new IssuerController()).removeOperator);
        
        /**
         * @swagger
         * /api/issuers/register:
         *   post:
         *     summary: Register serverless Issuer
         *     description: Register serverless Issuer
         *     tags:
         *       - Issuer
         *     requestBody:
         *       description: Profile of Issuer
         *       content:
         *         multipart/form-data:
         *           schema:
         *             type: object
         *             properties:
         *               issuerId:
         *                 type: string
         *               name:
         *                 type: string
         *               description:
         *                 type: string
         *               logo:
         *                 type: string
         *                 format: binary
         *               contact:
         *                 type: string
         *               website:
         *                 type: string
         *     responses:
         *       200:
         *         description: A JSON object
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         */
        this.router.post(
            '/register',
            multer({ 
                storage: multer.diskStorage({
                    destination: `.${env.uploads.multerStorageDest}`,
                    filename: function ( req, file, cb ) {
                        cb( null, 'issuer-' + Date.now()+".png");
                    }
                })
            }).single('logo'),
            (new IssuerController()).registration
        );
    }
}