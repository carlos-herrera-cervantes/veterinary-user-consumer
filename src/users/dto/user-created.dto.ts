export class UserCreatedDto {
  userId: string;
  email: string;
  type: string;
  roles: string[];
}

export class UserUpdate {
  employee_id: string;
  roles: string[];
}
