'use strict';
const express = require('express');
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.json({
    uptime: process.uptime(),
    environment: env,
    headers: request.headers,
    message: 'Welcome!'
  })
});

app.get('/health', (req, res) => {
  res.json({
    health: 'ok'
  })
});

app.use((req, res, next) => {
  const err = new Error('Resource not found.');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err
  });
});

app.listen(port, (err) => {
  console.log(`server is listening on ${port}`);
});

module.exports = app;