import { Collection } from 'discord.js';
import { SlashCommandBuilderExecute } from './types/command-builder-execute';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { SLASH_COMMAND_KEY } from './decorators/slash-command.decorator';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

@Injectable()
export class CommandManager implements OnModuleInit {
  private readonly commands = new Collection<
    string,
    SlashCommandBuilderExecute
  >();

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit(): void {
    const providers =
      this.discoveryService.getProviders() as InstanceWrapper<unknown>[];

    for (const wrapper of providers) {
      const instance = wrapper.instance;

      if (!instance || typeof instance !== 'object') {
        continue;
      }

      const target = wrapper.metatype;

      if (!target) {
        continue;
      }

      const isSlashCommand = this.reflector.get<boolean>(
        SLASH_COMMAND_KEY,
        target,
      );

      if (!isSlashCommand) {
        continue;
      }

      if (!this.isSlashCommand(instance)) {
        continue;
      }

      const { name } = instance.getCommand();

      if (this.commands.has(name)) {
        throw new Error(`Duplicate slash command detected: ${name}`);
      }

      this.commands.set(name, instance);
    }
  }

  private isSlashCommand(
    instance: unknown,
  ): instance is SlashCommandBuilderExecute {
    return (
      typeof instance === 'object' &&
      instance !== null &&
      'getCommand' in instance &&
      'execute' in instance
    );
  }

  public getAllCommands() {
    return this.commands;
  }

  public getCommand(name: string) {
    return this.commands.get(name);
  }
}
