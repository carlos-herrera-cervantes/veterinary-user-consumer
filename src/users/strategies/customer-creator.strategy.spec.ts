import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { CustomerCreatorStrategy } from './customer-creator.strategy';

describe('CustomerCreatorStrategy', () => {
  let userService: UserService;
  let customerCreatorStrategy: CustomerCreatorStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerCreatorStrategy,
        {
          provide: UserService,
          useValue: {
            countCustomers: jest.fn(),
            createCustomer: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    customerCreatorStrategy = module.get<CustomerCreatorStrategy>(CustomerCreatorStrategy);
  });

  it('Should be defined', () => {
    expect(customerCreatorStrategy).toBeDefined();
  });

  it('Should return when customer already exist', async () => {
    const countCustomersMock = jest
      .spyOn(userService, 'countCustomers')
      .mockImplementation(() => Promise.resolve(1));
    const userCreated = {
      userId: '63011f0c193edf9fd4369911',
      email: 'test.customer@example.com',
      type: 'Customer',
      roles: [],
    };

    const got = await customerCreatorStrategy.createUser(userCreated);

    expect(countCustomersMock).toBeCalledTimes(1);
    expect(got).toBeUndefined();
  });

  it('Should create new customer', async () => {
    const countCustomersMock = jest
      .spyOn(userService, 'countCustomers')
      .mockImplementation(() => Promise.resolve(0));
    const createCustomerMock = jest
      .spyOn(userService, 'createCustomer')
      .mockImplementation(() => Promise.resolve());
    const userCreated = {
      userId: '63011f0c193edf9fd4369911',
      email: 'test.customer@example.com',
      type: 'Customer',
      roles: [],
    };

    await customerCreatorStrategy.createUser(userCreated);

    expect(countCustomersMock).toBeCalledTimes(1);
    expect(createCustomerMock).toBeCalledTimes(1);
  });
});
