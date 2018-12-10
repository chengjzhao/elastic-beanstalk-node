'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const logger = require('./services/logger');
const app = express();

app.use(require('morgan')('combined', {
  stream: {
    write: (message, encoding) => {
      logger.info(message);
    }
  }
}));

app.get('/', (req, res) => {
  res.json({
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
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
    const env = JSON.parse(data);
    res.json({
      data: {
        BUILD_ID: env.BUILD_ID,
        BUILD_NUMBER: env.BUILD_NUMBER,
        JOB_NAME: env.JOB_NAME,
        GIT_BRANCH: env.GIT_BRANCH,
        GIT_COMMIT: env.GIT_COMMIT
      }
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
    error: {
      message: err.message
    }
  });
});

module.exports = app;