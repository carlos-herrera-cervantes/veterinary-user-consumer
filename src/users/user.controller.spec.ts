import { Test, TestingModule } from '@nestjs/testing';
import { StrategyManager } from './strategies/strategy-manager';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let strategyManager: StrategyManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: StrategyManager,
          useValue: {
            runJob: jest.fn(),
          },
        },
      ]
    }).compile();

    strategyManager = module.get<StrategyManager>(StrategyManager);
    userController = module.get<UserController>(UserController);
  });

  it('Should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('Should run the job', async () => {
    const runJobMock = jest
      .spyOn(strategyManager, 'runJob')
      .mockImplementation(() => Promise.resolve());
    const userCreated = {
      userId: 'dummyid',
      email: 'test.employee@example.com',
      type: 'Organization',
      roles: [],
    };

    await userController.processUserCreated(userCreated);

    expect(runJobMock).toBeCalledTimes(1);
  });
});
