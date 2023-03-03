import type { Express, NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';

import { BadRequestError } from '../errors/http/BadRequestError.js';
import { IMAGE_TYPES, IMAGE_MAX_SIZE } from '../../lib/constants/index.js';
import env from '../../lib/env/index.js';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

export class UploadMiddleWare {

    public use(req: Request, res: Response, next: NextFunction): any {
        const fileStorage = multer.diskStorage({
            destination: (
                req: Request,
                file: Express.Multer.File,
                cb: DestinationCallback
            ): void => {
                cb(null, `.${env.uploads.multerStorageDest}`);
            },
            filename: (
                req: Request,
                file: Express.Multer.File,
                cb: FilenameCallback
            ): void => {
                const portal = file.fieldname.slice(0, -4);
                cb(null, portal+'-'+uuid()+path.extname(file.originalname));
            }
        });
    
        const fileFilter = (
            req: Request,
            file: Express.Multer.File,
            cb: FileFilterCallback
        ): void => {
            // Allowed ext
            const filetypes = IMAGE_TYPES;
            // Check ext
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            // Check mime
            const mimetype = filetypes.test(file.mimetype);

            if (!(mimetype && extname)) cb(new BadRequestError('Invalid upload file type'));

            // Allowed size
            const limit = IMAGE_MAX_SIZE;
            // Check size
            if (file.size > limit) cb(new BadRequestError('Upload file size too big'));

            cb(null, true);
        }

        return multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
            { name: 'issuerLogo', maxCount: 1 },
            { name: 'verifierLogo', maxCount: 1 }
        ])(req, res, next);
    }
}

export type UploadedFile = {
    [fieldname: string]: Express.Multer.File[]
}