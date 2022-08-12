import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { EmployeeCreatorStrategy } from './employee-creator.strategy';

describe('CustomerCreatorStrategy', () => {
  let userService: UserService;
  let employeeCreatorStrategy: EmployeeCreatorStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeCreatorStrategy,
        {
          provide: UserService,
          useValue: {
            countEmployees: jest.fn(),
            createEmployee: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    employeeCreatorStrategy = module.get<EmployeeCreatorStrategy>(EmployeeCreatorStrategy);
  });

  it('Should be defined', () => {
    expect(employeeCreatorStrategy).toBeDefined();
  });

  it('Should return when employee already exist', async () => {
    const countEmployeesMock = jest
      .spyOn(userService, 'countEmployees')
      .mockImplementation(() => Promise.resolve(1));
    const userCreated = {
      userId: 'dummyid',
      email: 'test.employee@veterinary.com',
      type: 'Organization',
      roles: ['SuperAdmin'],
    };

    const got = await employeeCreatorStrategy.createUser(userCreated);

    expect(countEmployeesMock).toBeCalledTimes(1);
    expect(got).toBeUndefined();
  });

  it('Should create new employee', async () => {
    const countEmployeesMock = jest
      .spyOn(userService, 'countEmployees')
      .mockImplementation(() => Promise.resolve(0));
    const createEmployeeMock = jest
      .spyOn(userService, 'createEmployee')
      .mockImplementation(() => Promise.resolve());
    const userCreated = {
      userId: 'dummyid',
      email: 'test.employee@veterinary.com',
      type: 'Organization',
      roles: ['SuperAdmin'],
    };

    await employeeCreatorStrategy.createUser(userCreated);

    expect(countEmployeesMock).toBeCalledTimes(1);
    expect(createEmployeeMock).toBeCalledTimes(1);
  });
});
