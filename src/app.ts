import 'reflect-metadata';
import glob from 'glob';
import mongoose from 'mongoose';
import { Container } from 'typedi';
import e, { Application } from 'express';
import { createExpressServer, getMetadataArgsStorage, useContainer as routingUseContainer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';

import env from './lib/env';
import logger from './lib/logger';

/**
 * Initialize server
 */
async function initialize() {

    /* ----- MongoDB ----- */

    const MONGODB_URL = `mongodb://${env.db.username}:${env.db.password}@${env.db.host}:${env.db.port}/${env.db.database}`;

    const createConnection = async(url: string) => {
        logger.info('Connecting to MongoDB...')
        try {
            await mongoose.connect(url, {
                socketTimeoutMS: 30000,
                keepAlive: true
            });
            logger.info('Connected to ' + url);
        } catch (err) {
            logger.error('Failed to connect to MongoDB');
            throw (err);
        }
    }
    
    await createConnection(MONGODB_URL);


    /* ----- IoC ----- */
    
    Container.set('logger', logger);
    routingUseContainer(Container);

    env.app.dirs.models.map((pattern) => {
        const modelFiles = glob.sync(pattern);
        modelFiles.map((file: string) => {
            Container.set(
                file.split('/').splice(-1)[0].replace(/.ts/g, ''),
                require(file).default
            )
            // console.log(
            //     file.split('/').splice(-1)[0].replace(/.ts/g, ''),
            //     require(file).default
            // )
        });
    });


    /* ----- Express app ----- */
    
    const app: Application = createExpressServer({
        cors: true,
        classTransformer: true,
        routePrefix: env.app.routePrefix,
        // defaultErrorHandler: false,
        controllers: env.app.dirs.controllers,
        middlewares: env.app.dirs.middlewares
    });

    if (!env.isTest) {
        app.listen(env.app.port, () => {
            logger.info('Server is running on port ' + env.app.port);
        });
    }

    /* ----- Swagger ----- */
    if (env.swagger.enabled) {
        const swaggerFile = routingControllersToSpec(
            getMetadataArgsStorage(),
            {},
            {}
        );
        
        swaggerFile.info = {
            title: env.app.name,
            description: env.app.description,
            version: env.app.version
        }

        swaggerFile.servers = [
            {
                url: `http://${env.app.host}:${env.app.port}${env.app.routePrefix}`
            }
        ]

        app.use(
            env.swagger.route,
            (_req: any, _res: any, next: () => any) => next(),
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile)
        )
        logger.info('Swagger UI is enabled')
    }
}

initialize()
.then()
.catch(error => logger.error('Server crashed: ' + error))
