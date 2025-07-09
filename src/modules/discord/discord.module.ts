import { Module } from '@nestjs/common';
import { DiscordGateway } from './discord.gateway';
import { DiscordService } from './discord.service';
import { CommandDispatcher } from './command.dispatcher';

@Module({
  imports: [],
  providers: [DiscordGateway, DiscordService, CommandDispatcher],
  exports: [DiscordService],
})
export class DiscordModule {}
