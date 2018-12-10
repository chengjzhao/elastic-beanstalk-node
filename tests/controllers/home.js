'use strict';
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

/**
 * https://mochajs.org/
 * https://www.chaijs.com/
 */

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
  before(() => {
    // runs before all tests in this block
  });
  after(() => {
    // runs after all tests in this block
  });
  beforeEach(() => {
    // runs before each test in this block
  });
  afterEach(() => {
    // runs after each test in this block
  });
  it('should respond with a json', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body).to.be.an('object');
        expect(res.body.headers).to.be.an('object');
        expect(res.body.uptime).to.be.a('number');
        expect(res.body.environment).to.be.undefined;
        expect(res.body.message).to.be.a('string');
        expect(res.body.version).to.be.undefined;
      })
      .end(done);
  });
});