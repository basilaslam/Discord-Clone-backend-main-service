import { Module } from '@nestjs/common';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Server, serverSchema } from './schema/server.schema';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Server.name, schema: serverSchema }]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1m',
      },
    }),
  ],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
