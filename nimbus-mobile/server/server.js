var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// START SERVER; CONNECT DATABASE
var app = express();

app.listen(1337, function() {
  console.log('Listening on port 1337');
});

app.get('/', function(req, res) {
  res.send('hi');
})

app.get('/api/users', function(req, res) {
  // query DB for all users, send all user models
  const dummyUserData = [{
    firstName: 'Graham',
    lastName: 'Perich',
    id: 1
  }, {
    firstName: 'Kerry',
    lastName: 'Beuck',
    id: 2
  }, {
    firstName: 'Ross',
    lastName: 'Perich',
    id: 3
  }];

  res.send(JSON.stringify(dummyUserData));
});

app.get('/api/users/:userID', function(req, res) {
  var userID = req.params.userID;
  res.send('userID is: ', userID);
});

exports.app = app;