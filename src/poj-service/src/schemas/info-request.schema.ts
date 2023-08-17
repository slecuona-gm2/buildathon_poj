import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type InfoRequestDocument = mongoose.Document & InfoRequest;

@Schema()
export class InfoRequest {
  @Prop()
  id: string;

  @Prop()
  companyId: string;

  @Prop()
  status: string;

  @Prop()
  txHash: string;

  @Prop()
  amount: number;

  @Prop()
  balance: number;
}

export const InfoRequestSchema =
  SchemaFactory.createForClass(InfoRequest);
