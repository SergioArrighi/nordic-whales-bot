import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Context } from 'telegraf';
import { ChatMemberAdministrator, ChatMemberOwner } from '@telegraf/types';

@Injectable()
export class UsersService {
  private users: User[] = [];

  isAdmin = async (ctx: Context): Promise<boolean> => {
    const admins = await ctx.getChatAdministrators();
    return (
      (ctx.from &&
        ctx.from.id &&
        admins
          .map((admin: ChatMemberOwner | ChatMemberAdministrator) => {
            return admin.user.id;
          })
          .includes(ctx.from.id)) ||
      false
    );
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
