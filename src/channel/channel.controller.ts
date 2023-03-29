import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller('channel')
export class ChannelController {
  constructor(private readonly _channlService: ChannelService) {}
  @Post('create')
  async createChannel(
    @Body() { name, parentServer, parentSection, type, chatType },
  ) {
    console.log(name, parentServer, parentSection, type, chatType);
    return await this._channlService.createChannel(
      name,
      parentServer,
      type,
      chatType,
    );
  }

  @Get('getAll/:id')
  async getAllChannel(@Param() { id }: { id: string }) {
    return await this._channlService.getAllChannels(id);
  }

  @Get('get/:id')
  async getChannel(@Param() { id }: { id: string }) {
    return await this._channlService.getChannels(id);
  }
}
