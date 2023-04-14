import * as dotenv from 'dotenv';
import * as path from 'path';
import * as pkg from '../../../package.json' assert { type: "json" };

import {
    getOsEnv, getOsEnvOptional, getOsPath, getOsPaths, normalizePort, toBool, toNumber
} from './utils.js';

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
        hostname: process.env.NODE_ENV === 'production' 
        ? getOsEnv('APP_HOST')
        : `${getOsEnv('APP_HOST')}:${getOsEnv('APP_PORT')}`,
        url: process.env.NODE_ENV === 'production' 
            ? `https://${getOsEnv('APP_HOSTNAME')}`
            : `http://${getOsEnv('APP_HOST')}:${getOsEnv('APP_PORT')}`
    },
    backupService: {
        url: getOsEnv('BACKUP_SERVICE_URL')
    },
    issuerService: {
        url: getOsEnv('ISSUER_SERVICE_URL')
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
        redoc: getOsEnv('SWAGGER_DOC_ROUTE') ?? '/docs',
        redocJson: getOsEnv('SWAGGER_DOC_ROUTE_JSON') ?? '/docs/swagger.json'
    },
    uploads: {
        multerStorageDest: getOsEnvOptional('MULTER_STORAGE_DESTINATION') ?? '/public/uploads'
    },
    zkProof: {
        validTime: Number(getOsEnvOptional('PROOF_VALID_TIME') ?? '86400000')
    },
    authenService: {
        url: getOsEnv('AUTHEN_SERVICE_URL')
    },
    git: {
        token: getOsEnv('GIT_TOKEN') ?? '',
        owner: getOsEnv('GIT_OWNER') ?? '',
        schemaModelsRepo: getOsEnv('SCHEMA_MODELS_REPO') ?? '',
        sha: getOsEnv('SHA') ?? '',
        jsonSchemaPath: getOsEnv('JSON_SCHEMA_PATH')?? 'json/schemas'
    }
};

export default env;
