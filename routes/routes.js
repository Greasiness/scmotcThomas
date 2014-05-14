module.exports = function(app, user){
app.get('/', function(req, res){
    res.render('index.html');
});


app.post('/DBinsert', function(req, res){
    var temp = new user({
        useremail: req.body.useremail,
        password: req.body.password
    });
    console.log("before save");
    temp.save(function (err) {if (err) console.log ('Error on save!')});
    console.log("saved " + req.body.useremail )  ;
    res.redirect('/db');
})  ;

app.get('/db', function(req,res){
    console.log('in route')
    user.find(function(err, users) {
        if (err) return console.error(err);
        res.send(users);
    });
});

app.get('/login', function(req,res){
    res.render('login.html');
});

app.post('/logindb', function(req,res){
    user.find({ email: req.body.useremail, password: req.body.password },function(err, users) {
        if (err || users.length == 0){
            res.send("Not Today");
            return console.error(err);
        }
        res.send("Today");
    });
});
};