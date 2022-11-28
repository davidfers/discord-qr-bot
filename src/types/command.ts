import {
  SlashCommandBuilder,
} from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export type ExecuteFunction = (interaction: CommandInteraction) => Promise<void>

export interface Command {
  data: SlashCommandBuilder;
  execute: ExecuteFunction;
}