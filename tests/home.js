const request = require('supertest');
const app = require('../app');

// Fail test
describe.skip('GET /', () => {
  it('should respond with hello world', (done) => {
    request(app)
      .get('/')
      .expect(200, 'hello world')
      .end(done);
  });
});

// Success test
describe('GET /', () => {
  it('should respond with json', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(done);
  });
});