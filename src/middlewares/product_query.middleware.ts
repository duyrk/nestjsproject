import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ProductQueryMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    console.log("Request"+req.path);
    if(req.path === '/product/get'){
        const {name, price} = req.query;
        console.log(!Number.isInteger(price));
        if(name && !Number.isInteger(Number(price))){
                return res.status(HttpStatus.BAD_REQUEST).json({
                    status:false,
                    message: 'Price is valid'
                })
        }
    }
    next();
  }
}