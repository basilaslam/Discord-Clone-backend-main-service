import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { serverDocument } from './schema/server.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/auth/guard/token.type';
import { UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class ServerService {
  constructor(
    @InjectModel('Server') private ServerModel: Model<serverDocument>,
    @InjectModel('User') private UserModel_: Model<UserDocument>,
    private nestJwt: JwtService,
  ) {}

  test(token: string) {
    const a = this.nestJwt.decode(token) as Token;
    a.email && console.log(a.email);
  }
  async listServers(token: string) {
    const { id } = this.nestJwt.decode(token) as Token;
    const user = await this.UserModel_.findOne({ _id: id }).populate('servers');
    console.log(user);
    return user.servers;
  }
  async listMembers(id: string) {
    const server = await this.ServerModel.findOne({ _id: id }).populate(
      'members',
    );
    console.log(server);
    return server;
  }

  async joinServer(serverId: string, token: string) {
    const { id } = this.nestJwt.decode(token) as Token;

    // Update Server Document
    await this.ServerModel.findByIdAndUpdate(serverId, {
      $addToSet: { members: id },
    });

    // Update User Document
    await this.UserModel_.findByIdAndUpdate(id, {
      $addToSet: { servers: serverId },
    });
  }

  async getAllServers() {
    const server = this.ServerModel.find({});
    return server;
  }
  async createServer(name: string, image: string, token: string) {
    const { id } = this.nestJwt.decode(token) as Token;
    const serverExist = await this.ServerModel.findOne({
      servername: name,
    });
    if (serverExist) {
      throw new HttpException(
        'This Server Is already Created',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    let newServer;
    let serverCreated;
    try {
      newServer = new this.ServerModel({
        servername: name,
        logo: image,
        members: [id],
      });
      serverCreated = await newServer.save();

      await this.UserModel_.findByIdAndUpdate(id, {
        $addToSet: { servers: serverCreated._id },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        console.log(error);
      }
    }
    return {
      message: `channel ${name} have been created successfully`,
      server: serverCreated,
    };
  }

  async editServer(currentName: string, updatedName: string) {
    console.log('stage = 2');

    const serverExist = await this.ServerModel.findOne({
      servername: updatedName,
    });
    if (serverExist) {
      throw new HttpException(
        'The server name is not avaliable',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    try {
      console.log('stage = 3');

      const find = { servername: currentName };
      const update = { servername: updatedName };
      const updateServer = await this.ServerModel.findOneAndUpdate(
        find,
        update,
      );
    } catch (error) {
      console.log(error);
    }
  }
  async deleteServer(name: string) {
    try {
      console.log('stage = 3');

      const find = { servername: name };
      const deleteServer = await this.ServerModel.deleteOne(find);
    } catch (error) {
      console.log(error);
    }
  }
}
