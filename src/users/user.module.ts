import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CustomerProfile,
  CustomerProfileSchema,
  EmployeeProfile,
  EmployeeProfileSchema,
} from './schemas/profile.schema';
import { CustomerCreatorStrategy } from './strategies/customer-creator.strategy';
import { EmployeeCreatorStrategy } from './strategies/employee-creator.strategy';
import { StrategyManager } from './strategies/strategy-manager';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: EmployeeProfile.name,
      schema: EmployeeProfileSchema,
      collection: 'profiles',
    }], 'employees'),
    MongooseModule.forFeature([{
      name: CustomerProfile.name,
      schema: CustomerProfileSchema,
      collection: 'profiles',
    }], 'customers'),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    StrategyManager,
    EmployeeCreatorStrategy,
    CustomerCreatorStrategy,
  ],
})
export class UserModule {}
