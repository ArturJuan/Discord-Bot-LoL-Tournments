import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { CommandDispatcher } from './command.dispatcher';

@Injectable()
export class DiscordGateway implements OnModuleInit {
  constructor(
    private readonly discordService: DiscordService,
    private readonly commandDispatcher: CommandDispatcher,
  ) {}

  onModuleInit() {
    const client = this.discordService.getClient();

    client.once('ready', () => {
      console.log(`[DiscordGateway] Bot online como ${client?.user?.tag}`);
    });
  }
}
