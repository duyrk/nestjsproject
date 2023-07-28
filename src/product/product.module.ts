
// module trong nestjs là một tập hợp cẩu các controller, service, module khác

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductSchema, Product } from './product.schema';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { ProductQueryMiddleWare } from 'src/middlewares/product_query.middleware';
@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, ProductQueryMiddleWare)
      .forRoutes(ProductController);
    //  .forRoutes({ path: 'cats', method: RequestMethod.GET });
    // có thể tùy chọn path hoặc method
  }
}
