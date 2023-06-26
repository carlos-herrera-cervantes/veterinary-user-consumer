import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  CustomerProfile,
  CustomerProfileDocument,
  EmployeeProfile,
  EmployeeProfileDocument,
  UserProfile,
  UserProfileDocument
} from './schemas/profile.schema';

@Injectable()
export class UserService {
  @InjectModel(EmployeeProfile.name, 'employees')
  private readonly employeeProfileModel: Model<EmployeeProfileDocument>;

  @InjectModel(CustomerProfile.name, 'customers')
  private readonly customerProfileModel: Model<CustomerProfileDocument>;

  @InjectModel(UserProfile.name, 'authorizer')
  private readonly userProfileModel: Model<UserProfileDocument>;

  private readonly logger: Logger = new Logger(UserService.name);

  async getUser(filter: FilterQuery<UserProfileDocument>): Promise<UserProfile> {
    return this.userProfileModel.findOne(filter);
  }

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

  async updateUser(filter: FilterQuery<UserProfileDocument>, userProfile: UserProfile): Promise<void> {
    await this.userProfileModel.findOneAndUpdate(filter, { $set: userProfile }, { new: true });
  }

  async deleteEmployees(filter?: FilterQuery<EmployeeProfileDocument>) {
    await this.employeeProfileModel.deleteMany(filter);
  }

  async deleteCustomers(filter?: FilterQuery<CustomerProfileDocument>): Promise<void> {
    await this.customerProfileModel.deleteMany(filter);
  }
}
