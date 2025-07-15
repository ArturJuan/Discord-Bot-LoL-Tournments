import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { SlashCommandBuilderExecute } from '../types/command-builder-execute';

const pingCommand: SlashCommandBuilderExecute = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Pong!');
  },
};

export default pingCommand;
