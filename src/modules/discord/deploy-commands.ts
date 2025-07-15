import {
  REST,
  Routes,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';
import { getCommands } from './get-commands';
import * as dotenv from 'dotenv';
dotenv.config();

export async function registerCommands() {
  const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

  const scripts = await getCommands('./commands');
  for (const command of scripts.values()) {
    commands.push(command.data.toJSON());
  }

  try {
    const rest = new REST({ version: '10' }).setToken(
      process.env.DISCORD_TOKEN!,
    );
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID!,
        process.env.DISCORD_GUILD_ID!,
      ),
      { body: commands },
    );

    console.log(
      `Successfully reloaded ${(data as { length: number }).length} application (/) commands.`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
}
