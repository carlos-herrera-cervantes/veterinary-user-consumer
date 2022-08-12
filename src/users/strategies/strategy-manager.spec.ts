import { Test, TestingModule } from '@nestjs/testing';
import { CustomerCreatorStrategy } from './customer-creator.strategy';
import { EmployeeCreatorStrategy } from './employee-creator.strategy';
import { StrategyManager } from './strategy-manager';

describe('StrategyManager', () => {
  let strategyManager: StrategyManager;
  let employeeCreatorStrategy: EmployeeCreatorStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:[
        StrategyManager,
        {
          provide: CustomerCreatorStrategy,
          useValue: {
            createUser: jest.fn(),
          },
        },
        {
          provide: EmployeeCreatorStrategy,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    strategyManager = module.get<StrategyManager>(StrategyManager);
    employeeCreatorStrategy = module.get<EmployeeCreatorStrategy>(EmployeeCreatorStrategy);
    strategyManager.onModuleInit();
  });

  it('Should be defined', () => {
    expect(strategyManager).toBeDefined();
  });

  it('Should return when the strategy not found', async () => {
    const userCreated = {
      userId: 'dummyid',
      email: 'test.employee@veterinary.com',
      type: 'Bad',
      roles: ['SuperAdmin'],
    };
    const got = await strategyManager.runJob(userCreated);
    expect(got).toBeUndefined();
  });

  it('Should create new user', async () => {
    const createUserMock = jest
      .spyOn(employeeCreatorStrategy, 'createUser')
      .mockImplementation(() => Promise.resolve());
    const userCreated = {
      userId: 'dummyid',
      email: 'test.employee@veterinary.com',
      type: 'Organization',
      roles: ['SuperAdmin'],
    };

    await strategyManager.runJob(userCreated);

    expect(createUserMock).toBeCalledTimes(1);
  });

  it('Should catch the error when creating a user', async () => {
    const createUserMock = jest
      .spyOn(employeeCreatorStrategy, 'createUser')
      .mockImplementation(() => Promise.reject('dummy error'));
    const userCreated = {
      userId: 'dummyid',
      email: 'test.employee@veterinary.com',
      type: 'Organization',
      roles: ['SuperAdmin'],
    };

    await strategyManager.runJob(userCreated);

    expect(createUserMock).toBeCalledTimes(1);
  });
});
