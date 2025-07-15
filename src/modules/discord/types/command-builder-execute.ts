import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

export interface SlashCommandBuilderExecute {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}
