import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { channelDocument } from './schema/channel.schema';
import { Model } from 'mongoose';

@Injectable()
export class channelRepository {
  constructor(
    @InjectModel('Channel') private channelModel: Model<channelDocument>,
  ) {}

  async create(
    name: string,
    parentServer: string,
    type: string,
    chatType: string,
  ) {
    console.log('stage-3');

    const channelExist = await this.channelModel.find({ name });
    console.log(channelExist, 'hhhhhhhhhhhhhhhhh');

    let newChannel;
    let channelCreated;

    try {
      console.log(parentServer, 'ygjhhhhhhhhhghjg');

      newChannel = new this.channelModel({
        name,
        parentServer,
        type,
        chatType,
      });

      channelCreated = await newChannel.save();
      console.log(channelCreated, 'afgsssssssgfdgsfdgsfdg');
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        console.log(error, 'get create');
      }
    }
    return {
      message: `channel ${name} have been created successfully`,
      server: channelCreated,
    };
  }

  async getAll(id: string) {
    let channels: any[];
    try {
      channels = await this.channelModel.find({
        parentServer: id,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        console.log(error, 'get All---', id);
      }
    }
    return channels;
  }
  async get(_id: string) {
    let channel: any;
    try {
      channel = await this.channelModel.findOne({ _id });
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        console.log(error, 'get get');
      }
    }
    return channel;
  }
}
