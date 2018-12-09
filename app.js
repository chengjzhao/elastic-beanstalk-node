'use strict';
const express = require('express');
const env = process.env.NODE_ENV || 'development';
const app = express();

app.get('/', (req, res) => {
  res.json({
    uptime: process.uptime(),
    environment: env,
    headers: req.headers,
    message: 'Welcome!'
  })
});

app.get('/health', (req, res) => {
  res.json({
    health: 'ok'
  })
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;