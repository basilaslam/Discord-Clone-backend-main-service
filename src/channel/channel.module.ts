import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { channelRepository } from './channel.repositery';
import { Channel, channelSchema } from './schema/channel.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: channelSchema }]),
  ],
  controllers: [ChannelController],
  providers: [channelRepository, ChannelService, ChannelModule],
})
export class ChannelModule {}
