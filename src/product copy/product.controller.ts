// controller: là nơi xử lý các request từ client
import { Controller, Get, Post, Body, Query, Param, Res, Delete,Req ,HttpStatus, HttpCode} from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductInsertRequestDTO } from "./dto/user_register_request.dto";
import { Response, Request } from "express";
import { ProductGetRequestDTO } from "./dto/product_get_request.dto";
import { ProductUpdateRequestDTO } from "./dto/product_update_request.dto";

// url: http://localhost:3000/product
//ten controller nhu nao se len param nhu the
@Controller('product')
export class ProductController{
    constructor(private readonly productService: ProductService){}
    //url: http://localhost:3000/product/insert
    @Post('insert')
    async insert(@Body() body:ProductInsertRequestDTO , @Res() res: Response){
        try {
            const responseDTO = await this.productService.insert(body);
            return res.status(HttpStatus.OK).json(responseDTO)
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
 //   http://localhost:3000/product/get?name=123&price=123
    @Get('get')
    async get(@Query() query: ProductGetRequestDTO, @Res() res: Response){
        
        try {
            //doc nam tu query string
            // const {name, price} = query;
            const responseDTO = await this.productService.get(query);
            return res.status(HttpStatus.OK).json(responseDTO)
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Post('update/:id')
    async update(@Param('id') id: string, @Body() body: ProductUpdateRequestDTO, @Res() res: Response){
        try {
        const responseDTO = await this.productService.update(id, body);
         return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Delete('delete/:id')
    async delete(@Param('id') id: string, @Res() res: Response){
        try {
            const responseDTO = await this.productService.delete(id);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}