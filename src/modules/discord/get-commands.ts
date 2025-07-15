import {
  Collection,
  SlashCommandBuilder,
  CommandInteraction,
} from 'discord.js';
import { readdir } from 'fs/promises';
import * as path from 'path';

export type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
};

export async function getCommands(
  directory: string,
): Promise<Collection<string, Command>> {
  const rootDir = path.join(__dirname, directory);
  const collection = new Collection<string, Command>();

  const filenames = await readdir(rootDir);

  for (const filename of filenames) {
    if (!/\.(js)$/.test(filename)) continue;

    const filePath = path.join(rootDir, filename);
    const module = (await import(filePath)) as { default: Command };
    const command = module.default;
    console.log(command);

    if (!command || !command.data || !command.execute) continue;

    collection.set(command.data.name, command);
  }

  return collection;
}
