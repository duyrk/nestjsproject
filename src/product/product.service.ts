
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductInsertResponseDTO } from './dto/product_insert_response.dto';
import { ProductGetResponseDTO } from './dto/product_get_response.dto';
import { ProductInsertRequestDTO } from './dto/product_insert_request.dto';
import { Product, ProductDocument } from './product.schema';
import { ProductGetRequestDTO } from './dto/product_get_request.dto';
import { ProductUpdateRequestDTO } from './dto/product_update_request.dto';
import { ProductUpdateResponseDTO } from './dto/product_update_response.dto';
import { ProductDeleteResponseDTO } from './dto/product_delete_response.dto';
@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>) { }

    async insert(requestDTO: ProductInsertRequestDTO): Promise<ProductInsertResponseDTO> {
        const product = new this.productModel(requestDTO);
        await product.save();
        const responseDTO: ProductInsertResponseDTO = {
            status: true,
            message: 'Insert product successfully'
        };
        return responseDTO;
    }
    async get(queries: ProductGetRequestDTO): Promise<ProductGetResponseDTO> {
        const { name, price } = queries;
        console.log('name:' + name);
        console.log('price:' + price);
        let query = {};
        if (name) {
            query = { ...query, name: name };
        }
        if (price) {
            query = { ...query, price: price }
        }
        const products = await this.productModel
            .find(query)
            .exec();
        const responseDTO: ProductGetResponseDTO = {
            status: true,
            message: 'Get products successfully',
            data: products,
        };
        return responseDTO;
    }
    async update(id: String, requestDTO: ProductUpdateRequestDTO):
        Promise<ProductUpdateResponseDTO> {
        try {
            const product = await this.productModel.findById(id);
            if (!product) {
                throw new Error('Product not found!');
            }
            const { name, price, quantity, description } = requestDTO;
            product.name = name ? name : product.name;
            product.price = price ? price : product.price;
            product.quantity = quantity ? quantity : product.quantity;
            product.description = description ? description : product.description;
            await product.save();
            const responseDTO: ProductUpdateResponseDTO = {
                status: true,
                message: "Cập nhật thành công!"
            }
            return responseDTO;
        } catch (error: any) {
            console.log("update servive error" + error);
            const responseDTO: ProductUpdateResponseDTO = {
                status: false,
                message: error.message
            }
            return responseDTO;
        }
    }
    async delete(id: String): Promise<ProductDeleteResponseDTO> {
        try {
            await this.productModel.findByIdAndDelete(id);
            const responseDTO: ProductDeleteResponseDTO = {
                status: true,
                message: "Xóa thành công!"
            }
            return responseDTO;
        } catch (error) {
            const responseDTO: ProductDeleteResponseDTO = {
                status: true,
                message: error.message
            }
            return responseDTO;
        }
    }
}
