import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  readonly admins: string[] = [];
  private users: User[] = [];

  constructor(private readonly configService: ConfigService) {
    this.admins = configService.getOrThrow<string>('ADMINS').split(',');
  }

  isAdmin = (userId: string): boolean => {
    return this.admins.includes(userId);
  };

  addUser = (user: User) => {
    if (
      !user.is_bot &&
      this.users.filter((item) => item.id === user.id).length === 0
    )
      this.users.push(user);
  };

  getUsers = (): User[] => {
    return this.users;
  };

  getUsersCount = (): number => {
    return this.users.length;
  };
}
