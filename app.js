'use strict';

const express = require('express');
const jade = require('jade')
let app = express();
let port = 3000;

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, function() {
  console.log('SERVER START...')
});
