import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
@Injectable()
export class DiscordService implements OnModuleInit {
  private client: Client;

  constructor() {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds],
    });
  }

  async onModuleInit() {
    await this.login();
  }

  async login() {
    await this.client.login(process.env.DISCORD_TOKEN);
  }

  getClient(): Client {
    return this.client;
  }
}
