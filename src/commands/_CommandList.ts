import fs from 'fs';
import path from 'path';
import { Collection } from 'discord.js';
import { Command } from '../types/command';

const commandsPath = path.join(__dirname, './');
const commandFiles = fs.readdirSync(commandsPath)
  .filter(file => file.endsWith('.ts') && !file.startsWith('_'));

export const CommandList = new Collection<string, Command>();

commandFiles.forEach(async (file) => {
  const filePath = path.join(commandsPath, file);
  const command = await import(filePath) as Command;
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    CommandList.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
})
