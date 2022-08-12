import { IUserCreator } from './user-creator.interface';
import { UserType } from '../../enums/user-type.enum';
import { UserCreatedDto } from '../dto/user-created.dto';
import { EmployeeCreatorStrategy } from './employee-creator.strategy';
import { CustomerCreatorStrategy } from './customer-creator.strategy';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class StrategyManager implements OnModuleInit {
  @Inject(EmployeeCreatorStrategy)
  private readonly employeeCreatorStrategy: EmployeeCreatorStrategy;

  @Inject(CustomerCreatorStrategy)
  private readonly customerCreatorStrategy: CustomerCreatorStrategy;

  private strategies: Map<string, IUserCreator>;

  private readonly logger = new Logger(StrategyManager.name);

  onModuleInit(): void {
    this.strategies = new Map<string, IUserCreator>([
      [UserType.Organization, this.employeeCreatorStrategy],
      [UserType.Customer, this.customerCreatorStrategy],
    ]);
  }

  async runJob(userCreated: UserCreatedDto): Promise<void> {
    const selectedStrategy = this.strategies.get(userCreated.type);

    if (!selectedStrategy) {
      this.logger.warn(`STRATEGY NOT FOUND: ${userCreated.type}`);
      return;
    }

    await selectedStrategy
      .createUser(userCreated)
      .catch(err => this.logger.error(`IMPOSIBLE CREATE USER: ${err}`));
  }
}
