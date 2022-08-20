import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Gender } from '../../enums/gender.enum';

export type EmployeeProfileDocument = EmployeeProfile & Document;

@Schema({ versionKey: false })
export class EmployeeProfile {
  @Prop()
  employee_id: Types.ObjectId;

  @Prop()
  email: string;

  @Prop({ default: new Date() })
  birthday: Date;

  @Prop({ default: Gender.NotSpecified })
  gender: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  last_name: string;

  @Prop({ default: [] })
  roles: string[];

  @Prop({ default: new Date() })
  created_at: Date;

  @Prop({ default: new Date() })
  updated_at: Date;
}

export const EmployeeProfileSchema = SchemaFactory.createForClass(EmployeeProfile);

export type CustomerProfileDocument = CustomerProfile & Document

@Schema({ versionKey: false })
export class CustomerProfile {
  @Prop()
  customer_id: Types.ObjectId;

  @Prop()
  email: string;

  @Prop({ default: new Date() })
  birthday: Date;

  @Prop({ default: Gender.NotSpecified })
  gender: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  last_name: string;

  @Prop({ default: '' })
  phone_number: string;

  @Prop({ default: new Date() })
  created_at: Date;

  @Prop({ default: new Date() })
  updated_at: Date;
}

export const CustomerProfileSchema = SchemaFactory.createForClass(CustomerProfile);
