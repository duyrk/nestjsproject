// controller: là nơi xử lý các request từ client
import { from } from "rxjs";
import { Controller, Get, Post, Body, Query, Param, Res, HttpStatus, HttpCode} from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductInsertRequestDTO } from "./dto/product_insert_request.dto";

// url: http://localhost:3000/product
//ten controller nhu nao se len param nhu the
@Controller('product')
export class ProductController{
    constructor(private readonly productService: ProductService){}
    //url: http://localhost:3000/product/insert
    @Post('insert')
    async insert(@Body() body:ProductInsertRequestDTO , @Res() res: any){
        try {
            const responseDTO = await this.productService.insert(body);
            return res.status(HttpStatus.OK).json(responseDTO)
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Get('get')
    async get(@Res() res: any){
        try {
            const responseDTO = await this.productService.get();
            return res.status(HttpStatus.OK).json(responseDTO)
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}