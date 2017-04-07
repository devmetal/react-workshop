const getWordsFrom = require('./scraping');

const negative = [];
const positive = [];

exports.addNegative = (words = []) => {
  if (Array.isArray(words)) {
    negative.push(...words);
  }
};

exports.addPositive = (words = []) => {
  if (Array.isArray(words)) {
    positive.push(...words);
  }
};

exports.analyzis = (url) => {
  const words = getWordsFrom(url);

  const negativeWords = words.share()
    .count(word => negative.includes(word));

  const positiveWords = words.share()
    .count(word => positive.includes(word));

  const countOfWords = words.share()
    .count();

  return {
    positiveWords,
    negativeWords,
    countOfWords,
  };
};
