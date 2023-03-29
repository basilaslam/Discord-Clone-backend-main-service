/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Schema as MongooseSchema } from 'mongoose';


export type channelDocument = HydratedDocument<Channel>;

@Schema({
  timestamps: true,
})
export class Channel {
  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true , type: MongooseSchema.Types.ObjectId})
  parentServer: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, default:'channel' })
  chatType: string;
}
export const channelSchema = SchemaFactory.createForClass(Channel);
