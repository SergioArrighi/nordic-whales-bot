import { Injectable, UseGuards } from '@nestjs/common';
import { Command, Help, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { UsersService } from './users/users.service';
import { IsAdminGuard } from './users/is-admin.guard';
import { User } from './users/entities/user.entity';

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

  @UseGuards(IsAdminGuard)
  @Command('list')
  async onList(ctx: Context) {
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
            .map((item) => JSON.stringify(item, null, 2))
            .join('\n')
        );
      else ctx.reply('No racers yet');
    }
  }
}
