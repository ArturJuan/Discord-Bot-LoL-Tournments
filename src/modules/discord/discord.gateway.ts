import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { Events } from 'discord.js';
// import { getCommands } from './get-commands';

@Injectable()
export class DiscordGateway implements OnModuleInit {
  constructor(
    private readonly discordService: DiscordService,
    // private readonly commandDispatcher: CommandDispatcher,
  ) {}

  onModuleInit() {
    const client = this.discordService.getClient();

    client.once('ready', () => {
      console.log(`[DiscordGateway] Bot online como ${client?.user?.tag}`);
    });

    client.on(Events.InteractionCreate, (interaction) => {
      // if (!interaction.isChatInputCommand()) return;

      // this.commandDispatcher.dispatch(interaction);

      console.log(interaction);
    });
  }
}
