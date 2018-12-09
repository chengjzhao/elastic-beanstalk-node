const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should respond with hello world', (done) => {
    request(app)
      .get('/')
      .expect(200, 'hello world')
      .end(done);
  });
});
