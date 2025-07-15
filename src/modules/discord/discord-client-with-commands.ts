import { Client, Collection } from 'discord.js';

export interface ClientWithCommands extends Client {
  commands: Collection<string, any>; // or a more specific command type
}
