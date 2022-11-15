// import 'reflect-metadata';
import glob from 'glob';
import mongoose from 'mongoose';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { Routers } from './api/routers/Router';
import env from './lib/env';
import logger from './lib/logger';
import * as db from './database';

export class App {

    public app!: Application;

    constructor () {
        this.initialize()
        .then(() => {
            this.app = this.createServer();
            this.configSwagger();
            this.startServer();
        }).catch(error => {
            logger.error('Server crashed: ' + error)
        })
    }

    public async initialize() {
        logger.info('Initializing...')
        await this.connectDatabase('mongo');
    }

    private async connectDatabase(database: string) {
        switch (database) {
            case db.DB.MONGODB:
                const MONGODB_URL = `mongodb://${env.db.username}:${env.db.password}@${env.db.host}:${env.db.port}/${env.db.database}`;
                try {
                    const dbConnection = new db.Mongo()
                    await dbConnection.init(MONGODB_URL, {});
                } catch(err) {
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

    private async globalVars() {}

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

                },
                apis: ['./src/api/routers/*.ts'],
                basePath: env.app.routePrefix
            };
            const swaggerSpec = swaggerJsdoc(options);
            this.app.use(`${env.swagger.route}`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
            logger.info('Swagger UI is enabled')
        }
    }

    private createServer() {
        const expressApp = express();
        
        expressApp.use(bodyParser.json())
        expressApp.use(bodyParser.urlencoded({ extended: true }));
        expressApp.use(compression())
        expressApp.use(cors())
        expressApp.use(env.app.routePrefix, new Routers().router);
        
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
