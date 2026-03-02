import { Collection } from 'discord.js';
import { SlashCommandBuilderExecute } from './types/command-builder-execute';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PingCommand } from './commands/ping';
import { TeamShuffleCommand } from './commands/team-shuffle';

@Injectable()
export class CommandManager implements OnModuleInit {
  private commands = new Collection<string, SlashCommandBuilderExecute>();

  constructor(
    private readonly pingCommand: PingCommand,
    private readonly teamShuffleCommand: TeamShuffleCommand,
  ) {}

  onModuleInit() {
    this.registerCommand(this.pingCommand);
    this.registerCommand(this.teamShuffleCommand);
  }

  private registerCommand(command: SlashCommandBuilderExecute) {
    const { name } = command.getCommand();
    this.commands.set(name, command);
  }

  public getAllCommands() {
    return this.commands;
  }

  public getCommand(name: string) {
    return this.commands.get(name);
  }
}
