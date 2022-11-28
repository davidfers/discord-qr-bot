/* eslint-disable @typescript-eslint/no-var-requires */
import { executeCommandAndSpyReply, getParsedCommand } from './testUtils';
import { Command } from '../src/types/command';
const url2qrCommand = require('../src/commands/url') as Command;


const expectedInvalidUrlResponse = 'Not a good url...';

const expectedValidResponse = expect.objectContaining({
  files: expect.arrayContaining([expect.objectContaining({
    name: expect.stringContaining('.png')
  })]),
  options: {
    ephemeral: true,
  }
});

const data = [
  {
    stringCommand: '/url2qr url: http://googlecom color: Red',
    fn: 'reply',
    expected: expectedInvalidUrlResponse,
    desc: 'Returns a warning string'
  },
  {
    stringCommand: '/url2qr url: google.com color: Red',
    fn: 'reply',
    expected: expectedInvalidUrlResponse,
    desc: 'Returns a warning string'
  },
  {
    stringCommand: '/url2qr url: http://google.com color: Red',
    fn: 'editReply',
    expected: expectedValidResponse,
    desc: 'Returns a png file'
  },
  {
    stringCommand: '/url2qr url: http://google.com color: Red',
    fn: 'editReply',
    expected: expectedValidResponse,
    desc: 'Returns a png file'
  },
]

describe.each(data)('$stringCommand', ({ stringCommand, expected, fn, desc }) => {
  test(desc, async () => {
    const { data, execute } = url2qrCommand;
    const parsedCommand = getParsedCommand(stringCommand, data);
    if (fn === 'reply') {
      const { spyReply } = await executeCommandAndSpyReply(execute, parsedCommand)
      expect(spyReply).toHaveBeenCalledWith(expected)
    }
    if (fn === 'editReply') {
      const { spyEditReply } = await executeCommandAndSpyReply(execute, parsedCommand)
      expect(spyEditReply).toHaveBeenCalledWith(expected)
    }
  })
})
