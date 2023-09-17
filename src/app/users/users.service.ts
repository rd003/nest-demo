import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.model';

@Injectable()
export class UsersService {
  private readonly users: UserDTO[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<UserDTO | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
