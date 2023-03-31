import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Model } from 'mongoose';
//get data from the other service and populate it here frome the returend json file
@Controller('chat')
export class MessagesController {
  constructor(
    @Inject('MESSAGE_SERVICE') private readonly client: ClientProxy,
  ) {}
  async onApplicationBootstrap() {
    try {
      await this.client.connect();
    } catch (err) {
      console.log(err);
    }
  }
  @Post('/createChat')
  async createChat(@Body() body) {
    const res = await this.client.send('create-chat', body).toPromise();
    console.log(res);
  }

  @Get('/:userId')
  async getChat(@Param() params) {
    const res = await this.client.send('get-chat', params).toPromise();
    console.log(res);
  }

  @Get('/chatFind/:firstId/:secondId')
  async findChat(@Param() params) {
    const res = await this.client.send('find-chat', params).toPromise();
    return res;
  }

  @HttpCode(200)
  @Post('/addMessage')
  async addMessage(@Body() body) {
    console.log('test-1');
    const res = await this.client.send('add-message', body).toPromise();
    return res;
  }
  @Get('/getMessages/:chatId')
  async getMessages(@Param() params) {
    const res = await this.client.send('get-message', params).toPromise();
    return res;
  }
}
