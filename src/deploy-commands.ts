import { NestFactory } from '@nestjs/core';
import {
  REST,
  Routes,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';

// Importe o módulo principal da sua aplicação ou o módulo que contém o CommandManager
import { AppModule } from './app.module';
import { CommandManager } from './modules/discord/command-manager.service';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  console.error(
    'DISCORD_TOKEN and DISCORD_CLIENT_ID must be set in .env file.',
  );
  process.exit(1);
}

async function deployCommands() {
  const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
  // 1. Inicializa um contexto mínimo do NestJS
  const appContext = await NestFactory.createApplicationContext(AppModule);

  // 2. Obtém uma instância do CommandManager do contexto
  const commandManager = appContext.get(CommandManager);

  // 3. Coleta todas as definições de comando
  const commandsCollection = commandManager.getAllCommands();
  for (const command of commandsCollection.values()) {
    commands.push(command.getCommand().toJSON());
  }

  // 4. Fecha o contexto da aplicação
  await appContext.close();

  // 5. Faz o deploy para a API do Discord
  const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN!);

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
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
    console.error(error);
  }
}

void deployCommands();
