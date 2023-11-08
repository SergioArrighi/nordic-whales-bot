# NordicWhalesBot

<a  alt="Nx logo"  href="https://nx.dev"  target="_blank"  rel="noreferrer"><img  src="https://pbs.twimg.com/profile_images/1514699908795748366/rwfu_rwz_400x400.jpg"  width="45"></a>
**A simple telegram bot to collect username list for community events for [@NordicWhalesLounge](https://t.me/nordicwhales)** 🐋

## Commands

- **/join** ➡️ The username is stored in a duplicate free array. It must not be a bot.

- **/list** ➡️ Returns the users with full detail (admins only).

- **/listUsernames** ➡️ Returns the list of usernames (admins only).

## Architecture

<a alt="Nx logo" href="https://nx.dev" target="_blank"  rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a> Monorepo workspace generated with [Nx](https://nx.dev)

<a alt="NestJS logo" href="https://nx.dev" target="_blank"  rel="noreferrer"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg" width="45"></a> Server framework [NestJS](https://nestjs.com/)

<a alt="TelegrafJS logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/18504346?s=200&v=4" width="45"></a> Telegram bot framework [TelegrafJS](https://telegrafjs.org/) (NestJS addon)

<a alt="TelegrafJS logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://cloud.githubusercontent.com/assets/2391349/23598327/a17bb68a-01ee-11e7-8f55-88a5fc96e997.png" width="45"></a> MacOS executable built with [nexe](https://github.com/nexe/nexe)

## User data

The data collected for the user represented by the `User` interface.

    export  interface  User  {
    	id:  number;
    	is_bot:  boolean;
    	first_name:  string;
    	last_name?:  string  |  undefined;
    	username?:  string  |  undefined;
    	language_code?:  string  |  undefined;
    }

## Usage

**Use branch `no-guard`** as master contains a NestJS guard for rejecting non-admin calls on endpoints via decorator and this causes an [issue](https://github.com/evilsprut/nestjs-telegraf/issues/1165) in Telegraf.

Install via npm or execute `main` executable file.

### Environment

- TELEGRAM_BOT_TOKEN ➡️ Valid telegram bot API token
- ADMINS ➡️ The list of the usernames of the admins
