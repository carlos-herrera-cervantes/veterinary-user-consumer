import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserCreatedDto } from '../dto/user-created.dto';
import { CustomerProfile } from '../schemas/profile.schema';
import { UserService } from '../user.service';
import { IUserCreator } from './user-creator.interface';
import { Types } from 'mongoose';

@Injectable()
export class CustomerCreatorStrategy implements IUserCreator {
  @Inject(UserService)
  private readonly customerProfileService: UserService;

  private readonly logger = new Logger(CustomerCreatorStrategy.name);

  async createUser(userCreated: UserCreatedDto): Promise<void> {
    const profileCounter = await this.customerProfileService.countCustomers({
      email: userCreated.email,
    });

    if (profileCounter) {
      this.logger.log(`CUSTOMER ALREADY EXIST: ${userCreated.email}`);
      return;
    }

    const customerProfile = new CustomerProfile();
    customerProfile.customer_id = new Types.ObjectId(userCreated.userId);
    customerProfile.email = userCreated.email;

    await this.customerProfileService.createCustomer(customerProfile);
  }
}
