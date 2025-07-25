import { Injectable } from '@nestjs/common';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { ClientWithCommands } from './types/client-with-commands';
import { CommandManager } from './command-manager.service';
@Injectable()
export class DiscordService {
  private client: ClientWithCommands;

  constructor(private readonly commandManager: CommandManager) {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds],
    }) as ClientWithCommands;

    this.client.commands = new Collection();

    void this.login();
  }

  async login() {
    await this.client.login(process.env.DISCORD_TOKEN);
    const allCommands = this.commandManager.getAllCommands();
    allCommands.forEach((cmd, name) => {
      this.client.commands.set(name, cmd);
    });
  }

  getClient(): ClientWithCommands {
    return this.client;
  }
}
