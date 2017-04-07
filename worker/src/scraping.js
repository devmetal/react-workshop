const Rx = require('rxjs/Rx');
const cheerio = require('cheerio');
const get = require('./get');

const scrape = url =>
  Rx.Observable.fromPromise(get(url))
    .map(html => cheerio.load(html))
    .switchMap($ => Rx.Observable.create((observer) => {
      $('html *').contents().each((i, el) => {
        if (el.type === 'text') observer.next($(el).text());
      });
      observer.complete();
    }))
    .switchMap(word => word
      .toLowerCase()
      .replace(/(\t|\n)/g, '')
      .replace(/[^a-zA-Z ]/g, '')
      .split(' '))
    .filter(word => word.length > 0);

module.exports = scrape;
