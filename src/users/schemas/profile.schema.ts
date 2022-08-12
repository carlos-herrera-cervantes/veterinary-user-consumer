import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from '../../enums/gender.enum';

export type EmployeeProfileDocument = EmployeeProfile & Document;

@Schema({ versionKey: false })
export class EmployeeProfile {
  @Prop({ name: '_id' })
  id: string;

  @Prop({ name: 'employee_id' })
  employeeId: string;

  @Prop({ name: 'email' })
  email: string;

  @Prop({ name: 'birthday', default: new Date() })
  birthday: Date;

  @Prop({ name: 'gender', default: Gender.NotSpecified })
  gender: string;

  @Prop({ name: 'name', default: null })
  name: string;

  @Prop({ name: 'last_name', default: null })
  lastName: string;

  @Prop({ name: 'roles' })
  roles: string[];

  @Prop({ name: 'created_at', default: new Date() })
  createdAt: Date;

  @Prop({ name: 'updated_at', default: new Date() })
  updatedAt: Date;
}

export const EmployeeProfileSchema = SchemaFactory.createForClass(EmployeeProfile);

export type CustomerProfileDocument = CustomerProfile & Document

@Schema({ versionKey: false })
export class CustomerProfile {
  @Prop({ name: '_id' })
  id: string;

  @Prop({ name: 'customer_id' })
  customerId: string;

  @Prop({ name: 'email' })
  email: string;

  @Prop({ name: 'birthday', default: new Date() })
  birthday: Date;

  @Prop({ name: 'gender', default: Gender.NotSpecified })
  gender: string;

  @Prop({ name: 'name', default: null })
  name: string;

  @Prop({ name: 'last_name', default: null })
  lastName: string;

  @Prop({ name: 'phone_number', default: null })
  phoneNumber: string;

  @Prop({ name: 'created_at', default: new Date() })
  createdAt: Date;

  @Prop({ name: 'updated_at', default: new Date() })
  updatedAt: Date;
}

export const CustomerProfileSchema = SchemaFactory.createForClass(CustomerProfile);
