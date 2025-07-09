import { Injectable } from '@nestjs/common';
import { ChatInputCommandInteraction } from 'discord.js';

@Injectable()
export class CommandDispatcher {
  dispatch(interaction: ChatInputCommandInteraction) {
    throw new Error('Method not implemented.');
  }
}
