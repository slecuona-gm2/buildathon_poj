import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type EmployeeDocument = mongoose.Document & Employee;

@Schema()
export class Employee {
  @Prop()
  id: string;

  @Prop()
  userId: string;

  @Prop()
  taxId: string; // CUIT

  @Prop()
  givenName: string;

  @Prop()
  familyName: string;

  @Prop()
  birthDate: Date;

  @Prop()
  email: string;

  @Prop()
  telephone: string;

  @Prop()
  nationality: string;
}

export const EmployeeSchema =
  SchemaFactory.createForClass(Employee);
