import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopic } from '../config/kafka.config';
import { UserService } from './user.service';
import { UserUpdate } from './dto/user-created.dto';
import { UserProfile, UserProfileDocument } from './schemas/profile.schema';
import { FilterQuery } from 'mongoose';

@Controller()
export class ProfileController {
  @Inject(UserService)
  private readonly userService: UserService;

  private readonly logger: Logger = new Logger(ProfileController.name);

  @MessagePattern(KafkaTopic.VeterinaryEmployeeProfileUpdate)
  async processUserUpdate(@Payload() message: UserUpdate): Promise<void> {
    this.logger.log(`new message arrive - user: ${message.employee_id}`);

    const filter: FilterQuery<UserProfileDocument> = {
      _id: message.employee_id,
    };
    const profile: UserProfile = await this.userService.getUser(filter);

    if (!profile) {
      this.logger.warn(`no profile for user: ${message.employee_id}`);
      return;
    }

    profile.roles = message.roles;
    profile.updated_at = new Date();

    await this.userService.updateUser(filter, profile);
  }
}
