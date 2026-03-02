import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { SlashCommandBuilderExecute } from '../types/command-builder-execute';

@Injectable()
export class TeamShuffleCommand implements SlashCommandBuilderExecute {
  getCommand() {
    return new SlashCommandBuilder()
      .setName('teamshuffle')
      .setDescription('Shuffle players into 2 or more teams.')
      .addIntegerOption((option) => {
        return option
          .setName('teams')
          .setDescription('The number of teams.')
          .setMinValue(2)
          .setRequired(false);
      })
      .addBooleanOption((option) => {
        return option
          .setName('allowodd')
          .setDescription(
            'Allow a shuffle odd or exclude a random player from the match.',
          )
          .setRequired(false);
      });
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const numberOfTeams = interaction.options.getInteger('teams');
    const allowOddTeam = interaction.options.getBoolean('allowodd');

    await interaction.reply(
      `This is the number of teams you have choosen: ${numberOfTeams}`,
    );
  }
}
