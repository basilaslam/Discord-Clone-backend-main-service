import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChannelModule } from './channel/channel.module';
import { ServerModule } from './server/server.module';
import { S3Module } from './s3/s3.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_LOCAL_CONNECTION_URL),
    AuthModule,
    UserModule,
    ChannelModule,
    ServerModule,
    MessagesModule,
    // S3Module,
  ],
  // providers: [ChannelService, ServerService],
})
export class AppModule {}
