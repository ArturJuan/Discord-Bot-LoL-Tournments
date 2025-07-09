import { Injectable } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';

@Injectable()
export class DiscordService {
  private client: Client;

  constructor() {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
    void this.login();
  }

  async login() {
    await this.client.login(process.env.DISCORD_TOKEN);
  }

  getClient(): Client {
    return this.client;
  }
}
