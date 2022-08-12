import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopic } from '../config/kafka.config';
import { UserCreatedDto } from './dto/user-created.dto';
import { StrategyManager } from './strategies/strategy-manager';

@Controller()
export class UserController {
  @Inject(StrategyManager)
  private readonly strategyManager: StrategyManager;

  @MessagePattern(KafkaTopic.UserCreated)
  async processUserCreated(@Payload() message: UserCreatedDto): Promise<void> {
    await this.strategyManager.runJob(message);
  }
}
