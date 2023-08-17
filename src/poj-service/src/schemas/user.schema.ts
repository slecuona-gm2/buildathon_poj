import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.Document & User;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  subscribedToNotifications: boolean;

  @Prop()
  subscribedToInfoRequest: boolean;
}

export const UserSchema =
  SchemaFactory.createForClass(User);
