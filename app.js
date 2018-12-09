'use strict';
const http = require('http');
const port = process.env.PORT || 3000;

const requestHandler = (request, response) => {
  console.log(new Date().toString(), request.url);
  const output = {
    uptime: process.uptime(),
    message: 'Welcome!'
  };
  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(JSON.stringify(output));
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
