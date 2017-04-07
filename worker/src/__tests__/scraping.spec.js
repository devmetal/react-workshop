/* global jest, it, expect */
import scrape from '../scraping';

jest.mock('../get');

it('Correctly give back the words', async () => {
  const words = await scrape('').toArray().toPromise();
  expect(words).toEqual(expect.arrayContaining([
    'example',
    'response',
    'i',
    'just',
    'use',
    'it',
    'for',
    'tests',
  ]));
});
