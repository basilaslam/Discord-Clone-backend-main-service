import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MESSAGE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://52.198.215.5:5672/discord'],
          queue: 'message_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [MessagesController],
})
export class MessagesModule {}
