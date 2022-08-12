import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserCreatedDto } from '../dto/user-created.dto';
import { EmployeeProfile } from '../schemas/profile.schema';
import { UserService } from '../user.service';
import { IUserCreator } from './user-creator.interface';

@Injectable()
export class EmployeeCreatorStrategy implements IUserCreator {
  @Inject(UserService)
  private readonly employeeProfileService: UserService;

  private readonly logger = new Logger(EmployeeCreatorStrategy.name);

  async createUser(userCreated: UserCreatedDto): Promise<void> {
    const profileCounter = await this.employeeProfileService.countEmployees({
      email: userCreated.email,
    });

    if (profileCounter) {
      this.logger.log(`EMPLOYEE ALREADY EXIST: ${userCreated.email}`);
      return;
    }

    const employeeProfile = new EmployeeProfile();
    employeeProfile.employeeId = userCreated.userId;
    employeeProfile.email = userCreated.email;
    employeeProfile.roles = userCreated.roles;

    await this.employeeProfileService.createEmployee(employeeProfile);
  }
}
