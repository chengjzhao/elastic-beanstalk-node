'use strict';
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const dir = path.join(__dirname, '../..', 'tmp');

(async function saveEnvironmentVariables() {
  try {
    // Check if directory exists
    const stats = await promisify(fs.stat)(dir);
    const isDir = stats.isDirectory();
    if (!isDir) {
      throw Error(`${dir} is not a directory.`);
    }
  } catch (error) {
    // Create directory
    await promisify(fs.mkdir)(dir);
  } finally {
    try {
      // Write json to file
      const env = JSON.stringify(process.env);
      await promisify(fs.writeFile)(`${dir}/environment-variables.json`, env, 'utf8');
    } catch (error) {
      console.log(error);
    }
  }
})();