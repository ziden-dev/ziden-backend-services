import winston from "winston";
import env from "../env/index.js";

// const colors = {
//     error: 'red',
//     warn: 'yellow',
//     info: 'green',
//     http: 'magenta',
//     debug: 'white',
// }

// winston.addColors(colors)

const logger = winston.createLogger({
    level: env.log.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.colorize({ all: true }),
        winston.format.printf(({ level, message, timestamp, stack }) => {
            if (stack) {
                // print log trace
                return `${timestamp} ${level}: ${message}\n${stack}`;
            }
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: env.isProduction ? [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new winston.transports.File({ filename: 'logs/all.log' }),
    ] : [
        new winston.transports.Console()
    ],
})
  
export default logger