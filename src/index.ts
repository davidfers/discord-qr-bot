import { Client, GatewayIntentBits, Events } from "discord.js";
import { CommandList } from './commands/_CommandList';
import config from './config';
import { clientReadyHandler, interactionCreateHandler } from './handlers';

console.log("Bot is starting...");

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = CommandList;

client.once(Events.ClientReady, clientReadyHandler);

client.on(Events.InteractionCreate, interactionCreateHandler);

client.login(config.BOT_TOKEN);
