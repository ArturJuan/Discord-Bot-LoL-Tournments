import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { Client, Events, Interaction, MessageFlags } from 'discord.js';
import { CommandManager } from './command-manager.service';

@Injectable()
export class DiscordGateway implements OnModuleInit {
  constructor(
    private readonly discordService: DiscordService,
    private readonly commandManager: CommandManager,
  ) {}

  async onModuleInit() {
    const client = this.discordService.getClient();

    this.registerListeners(client);

    await this.discordService.login();
  }

  private registerListeners(client: Client): void {
    client.once(Events.ClientReady, () => {
      console.log(`[DiscordGateway] Bot online como ${client.user?.tag}`);
    });

    client.on(Events.InteractionCreate, (interaction: Interaction) => {
      void this.handleInteraction(interaction);
    });
  }

  private async handleInteraction(interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    const command = this.commandManager.getCommand(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  }
}
