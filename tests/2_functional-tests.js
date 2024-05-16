const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  // #1
  test('GET: /api/convert?input=10L', function (done) {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(res.body.returnNum, 2.64172);
        assert.equal(res.body.returnUnit, "gal");
        done();
      });
  });
  // #2
  test('GET: /api/convert?input=32g', function (done) {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.equal(res.text, "invalid unit");
        done();
      });
  });
  // #3
  test('GET: /api/convert?input=3/7.2/4kg', function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.equal(res.text, "invalid number");
        done();
      });
  });
  // #4
  test('GET: /api/convert?input=3/7.2/4kilomegagram', function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });
  // #5
  test('GET: /api/convert?input=kg', function (done) {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(res.body.returnNum, 2.20462);
        assert.equal(res.body.returnUnit, "lbs");
        done();
      });
  });
});