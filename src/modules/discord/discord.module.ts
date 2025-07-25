import { Module } from '@nestjs/common';
import { DiscordGateway } from './discord.gateway';
import { DiscordService } from './discord.service';
import { CommandManager } from './command-manager.service';
import { PingCommand } from './commands/ping';
// import { CommandDispatcher } from './get-commands';

@Module({
  imports: [],
  providers: [DiscordGateway, DiscordService, CommandManager, PingCommand],
  exports: [DiscordService],
})
export class DiscordModule {}
