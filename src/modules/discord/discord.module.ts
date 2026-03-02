import { Module } from '@nestjs/common';
import { DiscordGateway } from './discord.gateway';
import { DiscordService } from './discord.service';
import { CommandManager } from './command-manager.service';
import { PingCommand } from './commands/ping';
import { TeamShuffleCommand } from './commands/team-shuffle';

@Module({
  imports: [],
  providers: [
    DiscordGateway,
    DiscordService,
    CommandManager,
    PingCommand,
    TeamShuffleCommand,
  ],
  exports: [DiscordService],
})
export class DiscordModule {}
