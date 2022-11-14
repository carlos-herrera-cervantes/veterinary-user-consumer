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

  @Prop()
  birthday: Date;

  @Prop({ default: Gender.NotSpecified })
  gender: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  last_name: string;

  @Prop({ default: [] })
  roles: string[];

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const EmployeeProfileSchema = SchemaFactory.createForClass(EmployeeProfile);

EmployeeProfileSchema.pre<EmployeeProfileDocument>('save', function () {
  this.birthday = !this.birthday ? new Date() : this.birthday;
  this.created_at = new Date();
  this.updated_at = new Date();
});

export type CustomerProfileDocument = CustomerProfile & Document

@Schema({ versionKey: false })
export class CustomerProfile {
  @Prop()
  customer_id: Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  birthday: Date;

  @Prop({ default: Gender.NotSpecified })
  gender: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  last_name: string;

  @Prop({ default: '' })
  phone_number: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const CustomerProfileSchema = SchemaFactory.createForClass(CustomerProfile);

CustomerProfileSchema.pre<CustomerProfileDocument>('save', function () {
  this.birthday = !this.birthday ? new Date() : this.birthday;
  this.created_at = new Date();
  this.updated_at = new Date();
});
