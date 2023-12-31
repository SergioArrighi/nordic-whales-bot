import { Injectable } from '@nestjs/common';
import { Command, Help, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { UsersService } from './users/users.service';
import { User } from './users/entities/user.entity';

type UserFilter = (user: User) => string | undefined;

@Update()
@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Welcome');
  }

  @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply('Type /join to join the race');
  }

  @Command('join')
  async onJoinRace(ctx: Context) {
    if (ctx.from) this.usersService.addUser(ctx.from);
    console.log('Racers');
    this.usersService.getUsers().map((user) => {
      console.log(`from: ${JSON.stringify(user, null, 2)}`);
    });
    await ctx.reply(
      `You joined the race! ${this.usersService.getUsersCount()} racers`
    );
  }

  @Command('list')
  async onList(ctx: Context) {
    const filter: UserFilter = (user: User) => JSON.stringify(user, null, 2);
    this.listUserNames(ctx, filter);
  }

  @Command('listUsernames')
  async onListUsernames(ctx: Context) {
    const filter: UserFilter = (user: User) => user.username;
    this.listUserNames(ctx, filter);
  }

  private listUserNames(ctx: Context, filter: UserFilter) {
    if (
      ctx.from &&
      ctx.from.username &&
      this.usersService.isAdmin(ctx.from.username)
    ) {
      const users: User[] = this.usersService.getUsers();
      if (users.length > 0)
        ctx.reply(
          this.usersService
            .getUsers()
            .map((user) => filter(user))
            .join('\n')
        );
      else ctx.reply('No racers yet');
    } else ctx.reply('Only admins can use this command');
  }
}
