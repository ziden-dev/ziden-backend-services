import { Router } from 'express';
import { ServiceProviderController } from '../controllers/ServiceProviderController';

export class ServiceProviderRouter {
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
         *     ServiceProvider:
         *       properties:
         *         _id:
         *           type: string
         *           example: 66555d65-1e87-4428-86c1-35f0e23480f4
         *         name:
         *           type: string
         *           example: Organization Ltd
         *         description:
         *           type: string
         *           example: This is our Organization Ltd, we provide identity source
         *         contact:
         *           type: string
         *           example: contact@organiza.tion
         *         website:
         *           type: string
         *           example: https://organiza.tion
         *         logoUrl:
         *           type: string
         *           example: https://logo.jpg
         *     ServiceProviderForm:
         *       properties:
         *         name:
         *           type: string
         *           example: Organization Ltd
         *         description:
         *           type: string
         *           example: This is our Organization Ltd, we provide identity source
         *         contact:
         *           type: string
         *           example: contact@organiza.tion
         *         website:
         *           type: string
         *           example: https://organiza.tion
         *         logoUrl:
         *           type: string
         *           example: https://logo.jpg
         */

        /**
         * @swagger
         * /api/serviceProviders:
         *   post:
         *     summary: Create new Service Provider
         *     description: Register new Service Provider
         *     tags:
         *       - Service Provider
         *     requestBody:
         *       description: A JSON form of Service Provider
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               provider:
         *                 $ref: '#/components/schemas/ServiceProvider'
         *     responses:
         *       '200':
         *         description: A JSON object of Service Provider
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               newProvider:
         *                 $ref: '#/components/schemas/ServiceProvider'
         */
        this.router.post('/', (new ServiceProviderController()).registerServiceProvider);

        /**
         * @swagger
         * /api/serviceProviders:
         *   get:
         *     summary: Find all Service Provider
         *     description: Get all registered Service Provider
         *     tags:
         *       - Service Provider
         *     responses:
         *       200:
         *         description: A JSON array of Service Provider
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 providers:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/ServiceProvider'
         */
        this.router.get('/', (new ServiceProviderController()).findAllProviders);

        /**
         * @swagger
         * /api/serviceProviders/{providerId}:
         *   get:
         *     summary: Find one Service Provider
         *     description: Query an registered Service Provider by unique ID
         *     tags:
         *       - Service Provider
         *     parameters:
         *       - in: path
         *         name: providerId
         *         schema:
         *           type: string
         *         required: true
         *         description: Unique ID of Service Provider
         *     responses:
         *       200:
         *         description: A JSON object of Service Provider
         *         content:
         *           application/json:
         *             schema:
         *             type: object
         *             properties:
         *               provider:
         *                 $ref: '#/components/schemas/ServiceProvider'
         */
        this.router.get('/:providerId', (new ServiceProviderController()).findOneProvider);

        /**
         * @swagger
         * /api/serviceProviders/{providerId}/services:
         *   get:
         *     summary: Find all schemas of Service Provider
         *     description: Query schemas of an registered Service Provider by unique ID
         *     tags:
         *       - Service Provider
         *     parameters:
         *       - in: path
         *         name: providerId
         *         schema:
         *           type: string
         *         required: true
         *         description: Unique ID of Service Provider
         *     responses:
         *       200:
         *         description: A JSON array of Service
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 schemas:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/Service'
         */
        this.router.get('/:providerId/services', (new ServiceProviderController()).findAllServicesOfProvider);

        /**
         * @swagger
         * /api/serviceProviders/{providerId}/verifiers:
         *   get:
         *     summary: Find all issuers of Service Provider
         *     description: Query issuers of an registered Service Provider by unique ID
         *     tags:
         *       - Service Provider
         *     parameters:
         *       - in: path
         *         name: providerId
         *         schema:
         *           type: string
         *         required: true
         *         description: Unique ID of Service Provider
         *     responses:
         *       200:
         *         description: A JSON array of Service
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 issuers:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/Service'
         */
        this.router.get('/:providerId/verifiers', (new ServiceProviderController()).findAllVerifiersOfProvider);
    }
}