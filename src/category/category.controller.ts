// controller: là nơi xử lý các request từ client
import { Controller, Get, Post, Body, Query, Param, Res, Delete, Req, HttpStatus, HttpCode } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryInsertRequestDTO } from "./dto/category_insert_request.dto";
import { Response, Request } from "express";
import { CategoryGetRequestDTO } from "./dto/category_get_request.dto";
import { CategoryUpdateRequestDTO } from "./dto/category_update_request.dto";

// url: http://localhost:3000/category/
//ten controller nhu nao se len param nhu the
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }
    //url: http://localhost:3000/category/insert
    @Post('insert')
    async insert(@Body() body: CategoryInsertRequestDTO, @Res() res: Response) {
        try {
            const responseDTO = await this.categoryService.insert(body);
            return res.status(HttpStatus.OK).json(responseDTO)
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    //   http://localhost:3000/category/get?name=123&price=123
    @Get('get')
    async get(@Query() query: CategoryGetRequestDTO, @Res() res: Response) {

        try {
            //doc nam tu query string
            // const {name, price} = query;
            const responseDTO = await this.categoryService.get(query);
            return res.status(HttpStatus.OK).json(responseDTO)
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Post('update/:id')
    async update(@Param('id') id: string, @Body() body: CategoryUpdateRequestDTO, @Res() res: Response) {
        try {
            const responseDTO = await this.categoryService.update(id, body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Delete('delete/:id')
    async delete(@Param('id') id: string, @Res() res: Response) {
        try {
            const responseDTO = await this.categoryService.delete(id);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

}