var express = require('express');
  var  app = express();
 var   mongoose = require('mongoose');
  var  http = require('http');
  var  connect = require('connect');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(connect.bodyParser());       // to support JSON-encoded bodies
app.use(connect.urlencoded()); // to support URL-encoded bodies
app.use(cookieParser())
app.use(express.session({
    secret: 'thomasSecretKeyDontTellAnyone'
    , store: express.session.MemoryStore({
        reapInterval: 60000 * 10
    })
}));

var userSchema = new mongoose.Schema({
    useremail: String,
    password: String
});

var applicationSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    GPA: String,
    useremail: String
});

var user = mongoose.model('users', userSchema);
var application = mongoose.model('applications', applicationSchema);
//my heroku mondodb
mongoose.connect('mongodb://heroku:K_KZx326E9XPIwy_9S24NNGcVfQlcWL2KdaPe3BJh19sGT_-ef1M94p5LKRIDBv3K9d_HIPzqtem0tydEcHYMg@paulo.mongohq.com:10045/app18634011');

require('./routes/routes')(app, user, application);


http.createServer(app).listen(3002, function() {
    console.log('Express server listening on port ');
});