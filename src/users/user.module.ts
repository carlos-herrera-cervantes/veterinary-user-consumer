import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CustomerProfile,
  CustomerProfileSchema,
  EmployeeProfile,
  EmployeeProfileSchema,
  UserProfile,
  UserProfileSchema,
} from './schemas/profile.schema';
import { CustomerCreatorStrategy } from './strategies/customer-creator.strategy';
import { EmployeeCreatorStrategy } from './strategies/employee-creator.strategy';
import { StrategyManager } from './strategies/strategy-manager';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileController } from './profile.controller';

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
    MongooseModule.forFeature([{
      name: UserProfile.name,
      schema: UserProfileSchema,
      collection: 'users',
    }], 'authorizer'),
  ],
  controllers: [UserController, ProfileController],
  providers: [
    UserService,
    StrategyManager,
    EmployeeCreatorStrategy,
    CustomerCreatorStrategy,
  ],
})
export class UserModule {}
