import {
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  CommandInteraction,
} from 'discord.js';

export interface SlashCommandBuilderExecute {
  getCommand(): SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}
