/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true})
  firstName: string;

  @Prop({default:""})
  lastName: string;

  @Prop({required: true})
  email: string;

  @Prop()
  mobile: number;

  @Prop({default:""})
  image: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  confirmPassword: string;

  @Prop({required: true})
  signInWith: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
