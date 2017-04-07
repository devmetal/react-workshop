/* global jest, it, expect */
import * as Analysis from '../analysis';

jest.mock('../get');

Analysis.addNegative(['tests', 'for']);
Analysis.addPositive(['use', 'it']);

it('Count positive and negative words', async () => {
  const analitcs = Analysis.analyzis('');
  const positive = await analitcs.positiveWords.toPromise();
  const negative = await analitcs.negativeWords.toPromise();

  expect(positive).toEqual(2);
  expect(negative).toEqual(2);
});
