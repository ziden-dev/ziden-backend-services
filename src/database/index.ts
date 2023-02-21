export * from './mongo.js';

export enum DB {
    MONGODB = 'mongo',
    LEVELDB = 'level',
    REDIS = 'redis'
}