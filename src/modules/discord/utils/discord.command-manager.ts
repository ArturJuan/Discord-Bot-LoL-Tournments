// import {
//   REST,
//   Routes,
//   RESTPostAPIChatInputApplicationCommandsJSONBody,
//   Collection,
//   SlashCommandBuilder,
//   CommandInteraction,
// } from 'discord.js';
// import { readdir } from 'fs/promises';
// import { SlashCommandBuilderExecute } from '../types/command-builder-execute';
// import * as path from 'path';
// import * as dotenv from 'dotenv';
// import { Injectable, OnModuleInit } from '@nestjs/common';
// dotenv.config();

// @Injectable()
// export class DiscordCommandManager implements OnModuleInit {
//   private commands: Collection<string, SlashCommandBuilderExecute> = new Collection();

//   onModuleInit() {
//     // deployCommands();
//   }

//   async function getCommands(directory: string): Promise<Collection<string, SlashCommandBuilderExecute>> {
//     const rootDir = path.join(__dirname, '..', directory);
//   }
// }

// export async function getCommands(
//   directory: string,
// ): Promise<Collection<string, Command>> {
//   const rootDir = path.join(__dirname, '..', directory);
//   const collection = new Collection<string, Command>();

//   const filenames = await readdir(rootDir);

//   for (const filename of filenames) {
//     if (!/\.(js)$/.test(filename)) continue;

//     const filePath = path.join(rootDir, filename);
//     const module = (await import(filePath)) as { default: Command };
//     const command = module.default;

//     if (!command || !command.data || !command.execute) continue;

//     collection.set(command.data.name, command);
//   }

//   return collection;
// }

// export async function registerCommands() {
//   const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

//   const scripts = await getCommands('./commands');
//   for (const command of scripts.values()) {
//     commands.push(command.data.toJSON());
//   }

//   try {
//     const rest = new REST({ version: '10' }).setToken(
//       process.env.DISCORD_TOKEN!,
//     );
//     const data = await rest.put(
//       Routes.applicationGuildCommands(
//         process.env.DISCORD_CLIENT_ID!,
//         process.env.DISCORD_GUILD_ID!,
//       ),
//       { body: commands },
//     );

//     console.log(
//       `Successfully reloaded ${(data as { length: number }).length} application (/) commands.`,
//     );
//   } catch (error) {
//     // And of course, make sure you catch and log any errors!
//     console.error(error);
//   }
// }
