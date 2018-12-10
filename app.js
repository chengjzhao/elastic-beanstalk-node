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
  const err = new Error('Resource not found.');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err
  });
});

module.exports = app;