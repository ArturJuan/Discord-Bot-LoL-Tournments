import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { Events, Interaction, MessageFlags } from 'discord.js';
import { SlashCommandBuilderExecute } from './types/command-builder-execute';

@Injectable()
export class DiscordGateway implements OnModuleInit {
  constructor(private readonly discordService: DiscordService) {}

  onModuleInit() {
    const client = this.discordService.getClient();

    client.once('ready', () => {
      console.log(`[DiscordGateway] Bot online como ${client?.user?.tag}`);
    });

    const handleInteractionCreate = async (interaction: Interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = client.commands.get(
        interaction.commandName,
      ) as SlashCommandBuilderExecute;

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`,
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (e) {
        console.log(e);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: 'There was an error while executing this command!',
            flags: MessageFlags.Ephemeral,
          });
        }
      }
    };

    client.on(Events.InteractionCreate, (interaction) => {
      void handleInteractionCreate(interaction).catch(console.error);
    });
  }
}
