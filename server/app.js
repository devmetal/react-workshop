const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.Server(app);
const io = socketio(server);

const index = require('./modules/index');
const analizis = require('./modules/analizis')(io);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', index);
app.use('/api/job', analizis);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

server.listen(PORT, () => {
  process.stdout.write(`Listening on ${PORT}`);
});

module.exports = app;
