
// module trong nestjs là một tập hợp cẩu các controller, service, module khác

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategorySchema, Category } from './category.schema';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CategoryController);
    //  .forRoutes({ path: 'cats', method: RequestMethod.GET });
    // có thể tùy chọn path hoặc method
  }
}
