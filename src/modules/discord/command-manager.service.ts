import { Collection } from 'discord.js';
import { SlashCommandBuilderExecute } from './types/command-builder-execute';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PingCommand } from './commands/ping';

@Injectable()
export class CommandManager implements OnModuleInit {
  private commands = new Collection<string, SlashCommandBuilderExecute>();

  constructor(private readonly pingCommand: PingCommand) {}

  onModuleInit() {
    this.registerCommand(this.pingCommand);
  }

  private registerCommand(command: SlashCommandBuilderExecute) {
    const { name } = command.getCommand();
    this.commands.set(name, command);
  }

  public getAllCommands() {
    return this.commands;
  }
}
