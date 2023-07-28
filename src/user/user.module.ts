
// module trong nestjs là một tập hợp cẩu các controller, service, module khác

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema, User } from './user.schema';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { JwtModule } from '@nestjs/jwt/dist';
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  JwtModule.register({
    global: true,
    secret: 'hello-secret',
    signOptions: { expiresIn: '60s' },
  }),

  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UserController);
    //  .forRoutes({ path: 'cats', method: RequestMethod.GET });
    // có thể tùy chọn path hoặc method
  }
}
