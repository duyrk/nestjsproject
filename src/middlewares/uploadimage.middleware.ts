import { Injectable, NestMiddleware, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';
import { diskStorage } from 'multer';

@UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
        destination: './public/images', filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
        }
    })
}))

export class UploadFile implements NestMiddleware {
    use(@UploadedFile() file: Express.Multer.File, next: NextFunction) {
        console.log(file);
    }
}