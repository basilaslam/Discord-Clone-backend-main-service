/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Schema as MongooseSchema } from 'mongoose';


export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  username: string;
  
  @Prop({ required: true })
  email: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  DOB: string;

  @Prop()
  verified: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Server' })
  servers:  Array<string>;

}

export const UserSchema = SchemaFactory.createForClass(User);
