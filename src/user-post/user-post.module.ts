import { UserRepository } from './../user/repositories/user.repository';
import { UserPosts, userPostSchema } from './schemas/post.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ControllerController } from './controller/controller.controller';
import { UserPostService } from './service/service.service';
import { JwtModule } from '@nestjs/jwt';
import { UserPostRepository } from './respositories/post.repository';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserPosts.name, schema: userPostSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [ControllerController],
  providers: [UserPostService, UserPostRepository],
})
export class UserPostModule {}
