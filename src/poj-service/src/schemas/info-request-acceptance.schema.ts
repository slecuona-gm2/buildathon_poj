import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type InfoRequestAcceptanceDocument = mongoose.Document & InfoRequestAcceptance;

@Schema()
export class InfoRequestAcceptance {
  @Prop()
  id: string;

  @Prop()
  employeeId: string;

  @Prop()
  infoRequestId: string;

  @Prop()
  status: string;

  @Prop()
  txHash: string;
  
  @Prop()
  amount: number;
}

export const InfoRequestAcceptanceSchema =
  SchemaFactory.createForClass(InfoRequestAcceptance);
