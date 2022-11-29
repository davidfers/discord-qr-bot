import { REST, Routes } from 'discord.js';
import path from 'path';
import fs from 'fs';
import config from './config';
import { ApplicationCommand } from 'discord.js';
import { Command } from './types/command';

const { BOT_TOKEN, CLIENT_ID } = config;

const commands: ApplicationCommand[] = [];
const commandsPath = path.join(__dirname, './commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') && !file.startsWith('_'));

(async () => {
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command: Command = await import(filePath);
    commands.push(command.data.toJSON() as ApplicationCommand);
  }
  // Construct and prepare an instance of the REST module
  const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands },
    ) as ApplicationCommand[];

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
