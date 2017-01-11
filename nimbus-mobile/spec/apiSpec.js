var chai = require('chai');
var supertest = require('supertest');
var expect = require('chai').expect;
var api = supertest('http://107.170.233.162:1337/api');

var nonexistantID = 1234567890123456;
var dummyID = 1424212884257136;
var dummyPinID = '901a5cf0-d522-11e6-b061-39498d4feefc';

describe('App:', () => {
  it('a GET/ to a nonexistant path should return a 404 response', function(done) {
    api.get('/stuff')
    .set('Accept', 'application/json')
    .expect(404, done);
  });
});

describe ('Users:', () => {
  it('a GET/ should return a 200 response', function(done) {
    api.get('/users')
    .set('Accept', 'application/json')
    .expect(200, done);
  });

  it('a GET/ response body should be an array', function(done) {
    api.get('/users')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      expect(res.body).to.be.an('array');
      done();
    });
  });

  it('a GET/ to a nonexistant user should return a 404 response', function(done) {
    api.get('/users/' + nonexistantID)
    .set('Accept', 'application/json')
    .expect(404, done);
  });

  it('a GET/ to a specific user should return a 200 response', function(done) {
    api.get('/users/' + dummyID)
    .set('Accept', 'application/json')
    .expect(200, done);
  });

  it('a GET/ to a specific user should respond with the correct user object', function(done) {
    api.get('/users/' + dummyID)
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      expect(res.body).to.be.an('array');
      expect(res.body[0].firstName).to.equal('Chris');
      expect(res.body[0].lastName).to.equal('Lu');
      expect(res.body[0].email).to.equal('No email');
      done();
    });
  });

  xit('a POST/ to users should create a user object', function(done) {
    api.post('/users')
    .send({
      firstName: 'Testing',
      lastName: 'Testerson'
    })
    .expect(201)
    .end(function(err, res) {
      expect(res.body).to.be.an('object');
      expect(res.body.params.userId).to.exist();
    });
  });

  xit('a DELETE/ to a specific user should delete that user', function(done) {
    api.delete('/users/' /* + Some ID*/)
    .expect(202);
    api.get('/users/' /* + Some ID*/)
    .expect(404);
  });

  xit('a PUT/ to a specific user should update that user', function(done) {
    api.put('/users/' /* + Some ID*/)
    .send({
      email: 'test@test.com'
    })
    .expect(202);
    api.get('/users/' /* + Some ID*/)
    .expect(200)
    .end(function(err, res) {
      expect(res.body.params.email).to.equal('test@test.com');
    });
  });

});

describe ('Pins:', () => {
  it('a GET/ should return a 200 response', function(done) {
    api.get('/users/' + dummyID + '/pins')
    .set('Accept', 'application/json')
    .expect(200, done);
  });

  it('a GET/ to a users pins response body should be an array', function(done) {
    api.get('/users/' + dummyID + '/pins')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      expect(res.body).to.be.an('array');
      done();
    });
  });

  it('a GET/ to a specific pin should return that pin', function(done) {
    api.get('/users/' + dummyID + '/pins/' + dummyPinID)
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(1);
      done();
    });
  });

  it('a GET/ to a nonexistant pin should respond with a 404', function(done) {
    api.get('/users/' + dummyID + '/pins/stuff')
    .set('Accept', 'application/json')
    .expect(404, done);
  });

  xit('a DELETE/ to a user should delete all pins associated with that user', function(done) {
    api.delete('/users/' /* + Some ID*/ + 'pins')
    .expect(202);
    api.get('/users/' /* + Some ID*/ + 'pins')
    .expect(404);
  });

  xit('a POST/ to pins should create a pin object associated with that user', function(done) {
    api.post('/users/' + dummyID + '/pins')
    .send({
      location: {
        latitude: 37.78381267,
        longitude: -122.4090877
      },
      mediaUrl: 'http://www.triesten.com/wp-content/uploads/2013/07/testing_services.png',
      description: 'This my friend, is a test'
    })
    .expect(201)
    .end(function(err, res) {
      expect(res.body).to.be.an('object');
      expect(res.body.params).to.exist();
    });
  });

  xit('a DELETE/ to a specific pin should delete that pin', function(done) {
    api.delete('/users/' + dummyID + '/pins/'/* + Some ID*/)
    .expect(202);
    api.get('/users/' + dummyID + '/pins/'/* + Some ID*/)
    .expect(404);
  });

  xit('a PUT/ to a specific user should update that user', function(done) {
    api.put('/users/' + dummyID + '/pins/'/* + Some ID*/)
    .send({
      description: 'This my friend, is an updated test'
    })
    .expect(202);
    api.get('/users/' + dummyID + '/pins/'/* + Some ID*/)
    .expect(200)
    .end(function(err, res) {
      expect(res.body.params.description).to.equal('This my friend, is an updated test');
    });
  });
});