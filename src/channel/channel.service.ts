import { Injectable } from '@nestjs/common';
import { channelRepository } from './channel.repositery';

@Injectable()
export class ChannelService {
  constructor(private readonly _channelRepository: channelRepository) {}
  async createChannel(
    name: string,
    parentServer: string,
    type: string,
    chatType: string,
  ) {
    console.log('stage-2');

    return await this._channelRepository.create(
      name,
      parentServer,
      type,
      chatType,
    );
  }

  async getAllChannels(id: string) {
    return await this._channelRepository.getAll(id);
  }

  async getChannels(id: string) {
    return await this._channelRepository.get(id);
  }
}
