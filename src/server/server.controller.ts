import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Headers,
} from '@nestjs/common';
import { ServerService } from './server.service';

@Controller('server')
export class ServerController {
  constructor(private readonly _serverService: ServerService) {}

  @Get('getAllServers')
  async getServers() {
    return await this._serverService.getAllServers();
  }
  @Get('listServers')
  async listServers(@Headers('Authorization') authorization: string) {
    const bearerToken = authorization.replace('Bearer ', '');
    return await this._serverService.listServers(bearerToken);
  }
  @Get('listMembers/:id')
  async listMembers(@Param() { id }) {
    return await this._serverService.listMembers(id);
  }

  @Get('join-server/:id')
  async joinServer(
    @Headers('Authorization') authorization: string,
    @Param() { id },
  ) {
    const bearerToken = authorization.replace('Bearer ', '');

    return await this._serverService.joinServer(id, bearerToken);
  }

  @Post('create')
  async createChannel(
    @Headers('Authorization') authorization: string,
    @Body() body,
  ) {
    const bearerToken = authorization.replace('Bearer ', '');
    this._serverService.createServer(body.serverName, body.image, bearerToken);
  }

  @Post('edit')
  async editChannel(@Body() body) {
    const { currentName, updatedName } = body;
    console.log(body);

    if (currentName !== updatedName) {
      this._serverService.editServer(currentName, updatedName);
    }
  }

  @Get('test')
  exampleMethod(@Headers('Authorization') authorization: string) {
    const bearerToken = authorization.replace('Bearer ', '');
    this._serverService.test(bearerToken);
    // use the bearer token here
  }

  @Delete('delete/:name')
  async Channel(@Param() params) {
    this._serverService.deleteServer(params.name);
  }
}
