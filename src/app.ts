import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { Routers } from './api/routers/Router.js';
import { LogMiddleware } from './api/middlewares/LogMiddleware.js';
import { ErrorHandling } from './api/middlewares/ErrorHandling.js';
import env from './lib/env/index.js';
import logger from './lib/logger/index.js';
import { GlobalVariables } from './lib/global/index.js';
import * as db from './database/index.js';
import redoc from 'redoc-express';

export class App {

    public app!: Application;

    constructor() {
        this.initialize()
            .then(() => {
                this.app = this.createServer();
                this.configSwagger();
                this.startServer();
            }).catch(error => {
                logger.error('Server crashed: ' + error);
                process.exit(1);
            })
    }

    public async initialize() {
        logger.info('Initializing...')
        await this.connectDatabase('mongo');
        await this.setupGlobalVars();
    }

    private async connectDatabase(database: string) {
        switch (database) {
            case db.DB.MONGODB:
                // const MONGODB_URL = `mongodb://${env.db.username}:${env.db.password}@${env.db.host}:${env.db.port}/${env.db.database}?authMechanism=DEFAULT&authSource=admin`;
                const MONGODB_URL = `mongodb://${env.db.host}:${env.db.port}/${env.db.database}`;
                try {
                    const dbConnection = new db.Mongo()
                    await dbConnection.init(MONGODB_URL, {});
                } catch (err) {
                    throw err;
                }
                break;
            case db.DB.LEVELDB:
                break;
            case db.DB.REDIS:
                break;
            default:
                throw ('Database not supported');
        }
    }

    private async setupGlobalVars() {
        const globalVars = await GlobalVariables.getInstance();
        if (globalVars === undefined) throw ('Setup global variables failed');
    }

    private async configSwagger() {
        if (env.swagger.enabled) {
            const options = {
                failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
                definition: {
                    openapi: '3.0.0',
                    info: {
                        title: env.app.name,
                        description: env.app.description,
                        version: env.app.version
                    },
                    host: `${env.app.host}:${env.app.port}`,
                    tags: [
                        {
                            "name": "Authen",
                            "description": "*List APIs for authentication.*"
                        },
                        {
                            "name": "Claim",
                            "description": "*List APIs for Claims.*"
                        },
                        {
                            "name": "Issuer",
                            "description": "*List APIs to manager Issuers.*"
                        },
                        {
                            "name": "Network",
                            "description": "*List APIs to config networks.*"
                        },
                        {
                            "name": "Proof",
                            "description": "*List APIs to generate proof request and verify proof.*"
                        },
                        {
                            "name": "Registry",
                            "description": "*List APIs to manager Registry Services.*"
                        },
                        {
                            "name": "Schema",
                            "description": "*List APIs to manager Schema.*"
                        },
                        {
                            "name": "Service",
                            "description": "*List APIs to manager Service.*"
                        },
                        {
                            "name": "Verifier",
                            "description": "*List APIs to manager Verifier.*"
                        }
                    ]

                },
                apis: ['./src/api/routers/*.ts'],
                basePath: env.app.routePrefix
            };
            const swaggerSpec = swaggerJsdoc(options);
            this.app.use(`${env.swagger.route}`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
            this.app.get(`${env.swagger.redocJson}`, (req, res) => {
                res.send(swaggerSpec);
            });
            this.app.get(`${env.swagger.redoc}`, redoc({
                title: 'API Docs',
                specUrl: `${env.swagger.redocJson}`
            }));
            logger.info('Swagger UI is enabled');
        }
    }

    private createServer() {
        const expressApp = express();

        expressApp.use(bodyParser.json());
        expressApp.use(bodyParser.urlencoded({ extended: true }));
        expressApp.use(compression());
        expressApp.use(cors());
        expressApp.use('/ping', (req: Request, res: Response) => { res.send({ 'status': 'alive' }) });
        expressApp.use('/public', express.static('public'));
        expressApp.use(env.app.routePrefix, new LogMiddleware().use, new Routers().router);
        expressApp.use('/', new ErrorHandling().use);

        return expressApp;
    }

    private startServer() {
        if (!env.isTest) {
            this.app.listen(env.app.port, () => {
                logger.info('Server is running on port ' + env.app.port);
            });
        }
    }
}

const app = new App();
