import { isUrl } from '../src/utils';

const table = [
  { url: 'http://google.com', expected: true },
  { url: 'https://google.com', expected: true },
  { url: 'https://www.google.com', expected: true },
  { url: 'www.google.com', expected: true },
  { url: 'http:/google.com', expected: false },
  { url: 'google.com', expected: false },
  { url: 'google', expected: false }
]

test.each(table)('%s', ({ url, expected }) => {
  expect(isUrl(url)).toBe(expected);
})
