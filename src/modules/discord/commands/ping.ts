import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { SlashCommandBuilderExecute } from '../types/command-builder-execute';
@Injectable()
export class PingCommand implements SlashCommandBuilderExecute {
  getCommand() {
    return new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with Pong!');
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply('Pong!');
  }
}
