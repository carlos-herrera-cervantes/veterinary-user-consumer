import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CustomerProfile, EmployeeProfile } from '../src/users/schemas/profile.schema';
import { UserModule } from '../src/users/user.module';
import { UserService } from '../src/users/user.service';

let app: INestApplication;
let userService: UserService;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      MongooseModule.forRoot(process.env.EMPLOYEE_DB, {
        connectionName: 'employees',
      }),
      MongooseModule.forRoot(process.env.CUSTOMER_DB, {
        connectionName: 'customers',
      }),
      MongooseModule.forRoot(process.env.AUTHORIZER_DB, {
        connectionName: 'authorizer',
      }),
      UserModule,
    ],
  }).compile();

  app = module.createNestApplication();
  await app.init();

  userService = module.get<UserService>(UserService);
});

afterAll(async () => await app.close());

describe('UserService', () => {
  it('countEmployees - Should return 0 documents', async () => {
    const counter = await userService.countEmployees();
    expect(counter).toBeFalsy();
  });

  it('countCustomers - Should return 0 documents', async () => {
    const counter = await userService.countCustomers();
    expect(counter).toBeFalsy();
  });

  it('createEmployee, deleteEmployees - Should create a new employee and delete it', async () => {
    const newEmployee = new EmployeeProfile();
    newEmployee.employee_id = new Types.ObjectId('6371d61ec9e012e6054e2cac');
    newEmployee.email = 'user@example.com';
    newEmployee.birthday = new Date('1990-01-01');
    newEmployee.name = 'Test';
    newEmployee.last_name = 'Employee';

    await userService.createEmployee(newEmployee);

    const counter = await userService.countEmployees();
    expect(counter).toBeTruthy();

    await userService.deleteEmployees();
  });

  it('createCustomer, deleteCustomers - Should create a new customer and delete it', async () => {
    const newCustomer = new CustomerProfile();
    newCustomer.customer_id = new Types.ObjectId('6371da9c3c6a1fab013fbad9');
    newCustomer.email = 'user@example.com';
    newCustomer.birthday = new Date('1990-01-01');
    newCustomer.name = 'Test';
    newCustomer.last_name = 'Customer';

    await userService.createCustomer(newCustomer);

    const counter = await userService.countCustomers();
    expect(counter).toBeTruthy();

    await userService.deleteCustomers();
  });
});
