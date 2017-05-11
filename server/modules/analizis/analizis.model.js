const Queue = require('bull');
const { EventEmitter } = require('events');
const analysis = require('../../firebase');

const REDIS_PORT = 6379;
const REDIS_HOST = '127.0.0.1';

const jobs = new Map();
const jobQueue = Queue('sentiment', REDIS_PORT, REDIS_HOST);
const messages = Queue('messages', REDIS_PORT, REDIS_HOST);

const events = new EventEmitter();

// receive
messages.process((job) => {
  const saved = jobs.get(job.data.jobId);
  if (!saved || !saved.done) {
    events.emit('info', job.data);
    jobs.set(job.data.jobId, job.data);
    analysis.child(job.data.jobId).update(job.data);
  }
});

exports.add = url => jobQueue.add({ url })
  .then((job) => {
    const { jobId } = job;
    jobs.set(jobId, null);
    analysis.child(jobId).set({ url, jobId, done: false });
    return jobId;
  });

exports.get = url => jobs.get(url);

exports.getAll = () => [...jobs.values()];

exports.events = events;
