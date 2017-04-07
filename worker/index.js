const Queue = require('bull');
const Rx = require('rxjs/Rx');
const { join } = require('path');
const fs = require('fs');
const Analysis = require('./src/analysis');

const REDIS_PORT = 6379;
const REDIS_HOST = '127.0.0.1';

const wordsBase = join(__dirname, 'words');
const negativeF = join(wordsBase, 'negative-words.txt');
const positiveF = join(wordsBase, 'positive-words.txt');

const readFile = Rx.Observable.bindNodeCallback(fs.readFile);

const panic = (error) => {
  process.stderr.write(error);
  process.exit(1);
};

const log = message =>
  process.stdout.write(`${message}\n`);

readFile(negativeF).subscribe(
  content => Analysis.addNegative(content.toString().split('\n').filter(row => row.length)),
  error => panic(error.message),
  () => log('Negative words loaded')
);

readFile(positiveF).subscribe(
  content => Analysis.addPositive(content.toString().split('\n').filter(row => row.length)),
  error => panic(error.message),
  () => log('Positive words loaded')
);

const sentimentQueue = Queue('sentiment', REDIS_PORT, REDIS_HOST);
const messageQueue = Queue('messages', REDIS_PORT, REDIS_HOST);

sentimentQueue.process((job, done) => {
  const proc = Analysis.analyzis(job.data.url);
  const poz = proc.positiveWords.toPromise();
  const neg = proc.negativeWords.toPromise();
  const cnt = proc.countOfWords.toPromise();

  Promise.all([poz, neg, cnt]).then(
    results => done(null, {
      positive: results[0],
      negative: results[1],
      all: results[2],
    }),
    (error) => {
      log((error.message) ? error.message : error);
      return done(error, null);
    }
  );
});

sentimentQueue
  .on('ready', () => log('Sentiment Analiysis queue is ready'))
  .on('active', job => log(`Analisis statred on ${job.data.url}`))
  .on('completed', (job, result) => {
    log(`Job Completed ${job.data.url}`);
    log(`positive: ${result.positive}, negative: ${result.negative}`);
    messageQueue.add({ url: job.data.url, done: true, error: null, jobId: job.jobId, result });
  })
  .on('failed', (job, error) => {
    log(`Job Failed ${job.data.url} ${error}`);
    messageQueue.add({
      url: job.data.url,
      done: false,
      jobId: job.jobId,
      error: (error.message) ? error.message : error,
    });
  })
  .on('error', error => log((error.message) ? error.message : error));
