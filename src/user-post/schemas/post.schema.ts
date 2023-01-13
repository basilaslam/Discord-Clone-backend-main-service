/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type UserPostDocument = HydratedDocument<UserPosts>;

@Schema({
  timestamps: true,
})
export class UserPosts extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  image: Array<string>;

  @Prop({ default: '' })
  description: string;

  @Prop({ ref: 'User' })
  likes: Array<string>;
}

export const userPostSchema = SchemaFactory.createForClass(UserPosts);
