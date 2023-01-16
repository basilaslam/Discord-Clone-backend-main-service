/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type UserPostCommentDocument = HydratedDocument<UserPostsComments>;

@Schema({
  timestamps: true,
})
export class UserPostsComments extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'UserPosts',
    required: true,
  })
  postId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop()
  comment: string;

  @Prop({ ref: 'User' })
  likes: Array<string>;

  @Prop()
  replies: Array<object>;
}

export const UserPostsCommentsSchema = SchemaFactory.createForClass(UserPostsComments);
