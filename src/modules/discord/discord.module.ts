import { Module } from '@nestjs/common';
import { DiscordGateway } from './discord.gateway';
import { DiscordService } from './discord.service';
// import { CommandDispatcher } from './get-commands';

@Module({
  imports: [],
  providers: [DiscordGateway, DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
