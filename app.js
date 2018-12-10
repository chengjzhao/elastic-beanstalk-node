'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
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

app.get('/build', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'tmp', 'environment-variables.json');
    // Check if file exists
    const stats = await promisify(fs.stat)(filePath);
    const isFile = stats.isFile();
    if (!isFile) {
      throw Error(`Incorrect file format.`);
    }
    const data = await promisify(fs.readFile)(filePath, 'utf8');
    const variabes = JSON.parse(data);
    res.json({
      data: variabes
    });
  } catch (error) {
    next(error);
  }
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