import mongoose from "mongoose";
import logger from "../lib/logger";

export class Mongo {
    constructor() { }

    public async init(mongoUrl: string, options: mongoose.ConnectOptions) {
        try {
            await mongoose.connect(mongoUrl, options);
            logger.info('Connected to ' + mongoUrl);
        } catch(err) {
            logger.error('Failed to connect to MongoDB');
            throw (err);
        }
    }
}