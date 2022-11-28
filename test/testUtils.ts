import { SlashCommandBuilder, SlashCommandStringOption } from 'discord.js'
import { ExecuteFunction } from '../src/types/command'
import MockDiscord from './mockDiscord'

type option = {
  name: string;
  value: string;
  type: number
}

export interface ParsedCommand {
  id: string;
  name: string;
  type: number,
  options: option[]
}

export const optionType = {
  // 0: null,
  // 1: subCommand,
  // 2: subCommandGroup,
  3: String,
  4: Number,
  5: Boolean,
  // 6: user,
  // 7: channel,
  // 8: role,
  // 9: mentionable,
  10: Number,
}


/* Spy 'reply' */
export function mockInteractionAndSpyReply(command: ParsedCommand) {
  const discord = new MockDiscord(command)
  const interaction = discord.getInteraction();
  const spyEditReply = jest.spyOn(interaction, 'editReply');
  const spyReply = jest.spyOn(interaction, 'reply')
  return { interaction, spyReply, spyEditReply }
}


export async function executeCommandAndSpyReply(execute: ExecuteFunction, parsedCommand: ParsedCommand) {
  const { interaction, spyReply, spyEditReply } = mockInteractionAndSpyReply(parsedCommand)
  await execute(interaction)
  return { spyReply, spyEditReply }
}

function castToType(value: string, typeId: number) {
  const typeCaster = optionType[typeId as keyof typeof optionType]
  return typeCaster ? typeCaster(value) : value
}

export function getParsedCommand(stringCommand: string, commandData: SlashCommandBuilder) {

  const options = commandData.options as SlashCommandStringOption[];
  const optionsIndentifiers = options.map(option => `${option.name}:`);
  const requestedOptions = options.reduce((requestedOptions: any, option) => {
    const identifier = `${option.name}:`
    if (!stringCommand.includes(identifier)) return requestedOptions
    const remainder = stringCommand.split(identifier)[1]

    const nextOptionIdentifier = remainder.split(' ').find(word => optionsIndentifiers.includes(word))
    if (nextOptionIdentifier) {
      const value = remainder.split(nextOptionIdentifier)[0].trim()
      return [...requestedOptions, {
        name: option.name,
        value: castToType(value, option.type),
        type: option.type
      }]
    }
    return [...requestedOptions, {
      name: option.name,
      value: castToType(remainder.trim(), option.type),
      type: option.type
    }]
  }, []);
  const optionNames = options.map(option => option.name)
  const splittedCommand = stringCommand.split(' ')
  const name = splittedCommand[0].replace('/', '')
  const subcommand = splittedCommand.find(word => optionNames.includes(word))
  return {
    id: name,
    name,
    type: 1,
    options: subcommand ? [{
      name: subcommand,
      type: 1,
      options: requestedOptions
    }] : requestedOptions
  }
}
