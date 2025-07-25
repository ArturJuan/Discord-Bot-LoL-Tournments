import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

export interface SlashCommandBuilderExecute {
  getCommand(): SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}
