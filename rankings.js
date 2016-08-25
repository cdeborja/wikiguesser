var express = require('express');
var app = express();

var getRankings = require('./getRankings');
var landingPage = require('./landingPage');
var searchName = require('./searchName');
var readFile = require('fs').readFileSync;

app.get('/css/app.css', function (req, res) {
  console.log("loaded app.css");
  res.send(readFile("./css/app.css", "UTF8"));
});

app.get('/index.js', function (req, res) {
  console.log("loaded index.js");
  res.send(readFile("./index.js", "UTF8"));
});

// paths created

app.get('/', function (req, res) {
  landingPage(req, res);
});

app.get('/name/:name', function (req, res) {
  getRankings(req, res);
});

app.get('/search/:name', function (req, res) {
  searchName(req, res);
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
