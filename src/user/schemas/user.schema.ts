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

  @Prop({required: true})
  image: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  DOB: string;

  @Prop()
  verified: boolean;

  @Prop({ ref: 'Server' })
  servers:  Array<MongooseSchema.Types.ObjectId>;

}

export const UserSchema = SchemaFactory.createForClass(User);
