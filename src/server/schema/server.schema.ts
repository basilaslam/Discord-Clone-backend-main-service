/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Schema as MongooseSchema } from 'mongoose';


export type serverDocument = HydratedDocument<Server>;

@Schema({
  timestamps: true,
})
export class Server {
  @Prop({ required: true })
  servername: string;
  
  @Prop({type:MongooseSchema.Types.ObjectId, ref: 'channel',required:false})
  channels: Array<MongooseSchema.Types.ObjectId>;

  @Prop({type:MongooseSchema.Types.ObjectId, ref: 'users',required:false})
    adminstrators: Array<MongooseSchema.Types.ObjectId>;
  @Prop()
  logo: string;
  @Prop({required:false, type: MongooseSchema.Types.ObjectId, ref: 'users'})
  members:Array<MongooseSchema.Types.ObjectId>

  @Prop({required:false, type: MongooseSchema.Types.ObjectId,ref: 'users'})
  pendingReq:Array<MongooseSchema.Types.ObjectId>

  @Prop({required:false, type: MongooseSchema.Types.ObjectId,ref: 'users'})
  banned:Array<MongooseSchema.Types.ObjectId>

}
export const serverSchema = SchemaFactory.createForClass(Server);
