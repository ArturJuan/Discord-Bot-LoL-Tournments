import { Injectable } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
import { ClientWithCommands } from './discord-client-with-commands';
import { getCommands } from './get-commands';
import { registerCommands } from './deploy-commands';

@Injectable()
export class DiscordService {
  private client: ClientWithCommands;

  constructor() {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds],
    }) as ClientWithCommands;
    void this.login();
  }

  async login() {
    await this.client.login(process.env.DISCORD_TOKEN);
    this.client.commands = await getCommands('commands');
    await registerCommands();
  }

  getClient(): Client {
    return this.client;
  }
}
