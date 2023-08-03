
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoryInsertResponseDTO } from './dto/category_insert_response.dto';
import { CategoryGetResponseDTO } from './dto/category_get_response.dto';
import { CategoryInsertRequestDTO } from './dto/category_insert_request.dto';
import { Category, CategoryDocument } from './category.schema';
import { CategoryGetRequestDTO } from './dto/category_get_request.dto';
import { CategoryUpdateRequestDTO } from './dto/category_update_request.dto';
import { CategoryUpdateResponseDTO } from './dto/category_update_response.dto';
import { CategoryDeleteResponseDTO } from './dto/category_delete_response.dto';
@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name)
    private readonly CategoryModel: Model<CategoryDocument>) { }

    async insert(requestDTO: CategoryInsertRequestDTO): Promise<CategoryInsertResponseDTO> {
        const Category = new this.CategoryModel(requestDTO);
        await Category.save();
        const responseDTO: CategoryInsertResponseDTO = {
            status: true,
            message: 'Insert Category successfully'
        };
        return responseDTO;
    }
    async get(queries: CategoryGetRequestDTO): Promise<CategoryGetResponseDTO> {
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
        const Categorys = await this.CategoryModel
            .find(query)
            .exec();
        const responseDTO: CategoryGetResponseDTO = {
            status: true,
            message: 'Get Categorys successfully',
            data: Categorys,
        };
        return responseDTO;
    }
    async update(id: String, requestDTO: CategoryUpdateRequestDTO):
        Promise<CategoryUpdateResponseDTO> {
        try {
            const Category = await this.CategoryModel.findById(id);
            if (!Category) {
                throw new Error('Category not found!');
            }
            const { name, image, description } = requestDTO;
            Category.name = name ? name : Category.name;
            Category.image = image ? image : Category.image;
            Category.description = description ? description : Category.description;
            await Category.save();
            const responseDTO: CategoryUpdateResponseDTO = {
                status: true,
                message: "Cập nhật thành công!"
            }
            return responseDTO;
        } catch (error: any) {
            console.log("update servive error" + error);
            const responseDTO: CategoryUpdateResponseDTO = {
                status: false,
                message: error.message
            }
            return responseDTO;
        }
    }
    async delete(id: String): Promise<CategoryDeleteResponseDTO> {
        try {
            await this.CategoryModel.findByIdAndDelete(id);
            const responseDTO: CategoryDeleteResponseDTO = {
                status: true,
                message: "Xóa thành công!"
            }
            return responseDTO;
        } catch (error) {
            const responseDTO: CategoryDeleteResponseDTO = {
                status: true,
                message: error.message
            }
            return responseDTO;
        }
    }
}
