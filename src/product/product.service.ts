
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductInsertResponseDTO } from './dto/product_insert_response.dto';
import { ProductGetResponseDTO } from './dto/product_get_response.dto';
import { ProductInsertRequestDTO } from './dto/product_insert_request.dto';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService{
    constructor(@InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>){}

    async insert(requestDTO: ProductInsertRequestDTO): Promise<ProductInsertResponseDTO>{
        const product = new this.productModel(requestDTO);
        await product.save();
        const responseDTO: ProductInsertResponseDTO = {
            status: true,
            message: 'Insert product successfully'
        };
            return responseDTO;
    }
    async get(): Promise<ProductGetResponseDTO>{
        const products = await this.productModel.find({}).exec();
        const responseDTO: ProductGetResponseDTO ={
            status: true,
            message: 'Get products successfully',
            data: products,
        };
        return responseDTO;
    }
}
