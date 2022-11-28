/* eslint-disable @typescript-eslint/no-var-requires */
import { executeCommandAndSpyReply, getParsedCommand } from './testUtils';
import { Command } from '../src/types/command';
import * as utils from '../src/utils/'
import MockDiscord from './mockDiscord';
const user2qrCommand = require('../src/commands/user') as Command;


const validResponse = expect.objectContaining({
  files: expect.arrayContaining([expect.objectContaining({
    name: expect.stringContaining('.png')
  })]),
  options: {
    ephemeral: true,
  }
});

describe('/user2qr', () => {
  test('generateQR has been called with user', async () => {
    const spyGenerateQr = jest.spyOn(utils, 'generateQR');
    const stringCommand = '/user2qr';
    const { data, execute } = user2qrCommand;
    const parsedCommand = getParsedCommand(stringCommand, data);
    await executeCommandAndSpyReply(execute, parsedCommand);
    const username = new MockDiscord(parsedCommand).interaction.user.username;
    expect(spyGenerateQr).toHaveBeenCalledWith(username);
  });
  test('Returns a png file', async () => {
    const stringCommand = '/user2qr'
    const { data, execute } = user2qrCommand;
    const parsedCommand = getParsedCommand(stringCommand, data)
    const { spyEditReply } = await executeCommandAndSpyReply(execute, parsedCommand)
    expect(spyEditReply).toHaveBeenCalledWith(validResponse)
  });
})


