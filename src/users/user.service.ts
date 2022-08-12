import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  CustomerProfile,
  CustomerProfileDocument,
  EmployeeProfile,
  EmployeeProfileDocument,
} from './schemas/profile.schema';

@Injectable()
export class UserService {
  @InjectModel(EmployeeProfile.name, 'employees')
  private readonly employeeProfileModel: Model<EmployeeProfileDocument>;

  @InjectModel(CustomerProfile.name, 'customers')
  private readonly customerProfileModel: Model<CustomerProfileDocument>;

  async countEmployees(filter?: FilterQuery<EmployeeProfileDocument>): Promise<number> {
    return this.employeeProfileModel.countDocuments(filter);
  }

  async countCustomers(filter?: FilterQuery<CustomerProfileDocument>): Promise<number> {
    return this.customerProfileModel.countDocuments(filter);
  }

  async createEmployee(employeeDto: EmployeeProfile): Promise<void> {
    await this.employeeProfileModel.create(employeeDto);
  }

  async createCustomer(customerDto: CustomerProfile): Promise<void> {
    await this.customerProfileModel.create(customerDto);
  }
}
