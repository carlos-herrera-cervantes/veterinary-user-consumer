import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { UserService } from './user.service';
import { UserUpdate } from './dto/user-created.dto';
import { UserProfile } from './schemas/profile.schema';

describe('ProfileController', () => {
  let profileController: ProfileController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUser: jest.fn(),
            updateUser: jest.fn(),
          },
        },
      ]
    }).compile();

    userService = module.get<UserService>(UserService);
    profileController = module.get<ProfileController>(ProfileController);
  });

  it('Should be defined', () => {
    expect(profileController).toBeDefined();
  });

  it('processUserUpdate - Should exit when profile does not exit', async () => {
    const getUserMock = jest
      .spyOn(userService, 'getUser')
      .mockImplementation(() => Promise.resolve(null));
    const updateUserMock = jest
      .spyOn(userService, 'updateUser')
      .mockImplementation(() => Promise.resolve());
    const message: UserUpdate = {
      employee_id: 'dummyid',
      roles: ['Admin'],
    };

    await profileController.processUserUpdate(message);

    expect(getUserMock).toBeCalledTimes(1);
    expect(updateUserMock).toHaveBeenCalledTimes(0);
  });

  it('processUserUpdate - Should complete successfully', async () => {
    const getUserMock = jest
      .spyOn(userService, 'getUser')
      .mockImplementation(() => Promise.resolve(new UserProfile()));
    const updateUserMock = jest
      .spyOn(userService, 'updateUser')
      .mockImplementation(() => Promise.resolve());
    const message: UserUpdate = {
      employee_id: 'dummyid',
      roles: ['Admin'],
    };

    await profileController.processUserUpdate(message);

    expect(getUserMock).toBeCalledTimes(1);
    expect(updateUserMock).toHaveBeenCalledTimes(1);
  });
});
