import * as dotenv from 'dotenv';
import * as path from 'path';
import * as pkg from '../../../package.json';

import {
    getOsEnv, getOsEnvOptional, getOsPath, getOsPaths, normalizePort, toBool, toNumber
} from './utils';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) });

/**
 * Environment variables
 */
const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: getOsEnv('APP_NAME'),
        version: (pkg as any).version,
        description: (pkg as any).description,
        host: getOsEnv('APP_HOST'),
        routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
        port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
        // banner: toBool(getOsEnv('APP_BANNER')),
        dirs: {
            controllers: getOsPaths('CONTROLLERS'),
            middlewares: getOsPaths('MIDDLEWARES'),
            models: getOsPaths('MODELS'),
        },
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
        json: toBool(getOsEnvOptional('LOG_JSON') ?? 'false'),
        output: getOsEnv('LOG_OUTPUT'),
    },
    db: {
        host: getOsEnvOptional('MONGODB_HOST') ?? 'localhost',
        port: toNumber(getOsEnvOptional('MONGODB_PORT') ?? '27017'),
        database: getOsEnvOptional('MONGODB_DATABASE') ?? 'ziden-test',
        username: getOsEnvOptional('MONGODB_USERNAME'),
        password: getOsEnvOptional('MONGODB_PASSWORD'),
    },
    swagger: {
        enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
        route: getOsEnv('SWAGGER_ROUTE'),
        username: getOsEnv('SWAGGER_USERNAME'),
        password: getOsEnv('SWAGGER_PASSWORD'),
    }
};

export default env;
