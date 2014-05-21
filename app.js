var express = require('express');
  var  app = express();
 var   mongoose = require('mongoose');
  var  http = require('http');
  var  connect = require('connect');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(connect.bodyParser());       // to support JSON-encoded bodies
app.use(connect.urlencoded()); // to support URL-encoded bodies


var userSchema = new mongoose.Schema({
    useremail: String,
    password: String
});

var user = mongoose.model('users', userSchema);

//my heroku mondodb
mongoose.connect('mongodb://heroku:K_KZx326E9XPIwy_9S24NNGcVfQlcWL2KdaPe3BJh19sGT_-ef1M94p5LKRIDBv3K9d_HIPzqtem0tydEcHYMg@paulo.mongohq.com:10045/app18634011');

require('./routes/routes')(app, user);


http.createServer(app).listen(3000, function() {
    console.log('Express server listening on port ');
});