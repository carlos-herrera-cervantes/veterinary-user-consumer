import { UserCreatedDto } from '../dto/user-created.dto';

export interface IUserCreator {
  createUser(userCreated: UserCreatedDto): Promise<void>;
}
