module.exports = function(app, user, application){
app.get('/', function(req, res){
    if(req.session.useremail) {
        res.redirect('/home');
        console.log(req.session.useremail);
        return;
    }
    res.render('index.html');
});


app.post('/register', function(req, res){
    var temp = new user({
        useremail: req.body.useremail,
        password: req.body.password
    });
    console.log("before save");
    temp.save(function (err) {if (err) console.log ('Error on save!')});
    console.log("saved " + req.body.useremail )  ;
    res.redirect('/');
})  ;

app.get('/db', function(req,res){
    user.find(function(err, users) {
        if (err) return console.error(err);
        res.send(users);
    });
});

app.get('/login', function(req,res){
    res.render('login.html');
});

app.get('/register', function(req, res){
    res.render('register.html');
});

app.get('/home', function(req, res){
    user.find({useremail: req.session.useremail}, function(err, user){
        if(err || user.length == 0){
            res.render('loginfailed.html');
            return;
        }
        else
        application.find({useremail: req.session.useremail}, function(err, application){
            if(err||application.length== 0){
                res.render("homepage.html")
            } else
            {
                res.setHeader('Content-Type', 'text/html');
                res.write('<html><head></head>');
                res.write('<body>');
                var temp = '<p>' + application[0].firstname + '</p>'
                res.write(temp);
                temp = '<p>' + application[0].lastname + '</p>';
                res.write(temp);
                temp = '<p>' + application[0].GPA + '</p>';
                res.write(temp);
                res.write('<br><br>');
                res.write('<form action = "/reapply" method="POST">');

                res.write('<input type ="submit" value="Resubmit">');
                res.write('</form></body></html>');
                res.end;
            }

        });
    })
}) ;

app.get('/logout', function(req,res){
    req.session.destroy();
    res.redirect('/');
})

app.post('/login', function(req,res){
    user.find({ useremail: req.body.useremail, password: req.body.password },function(err, users) {
        if (err || users.length == 0){
            res.render('loginfailed.html');
            return console.error(err);
        }
        req.session.useremail = users[0].useremail;
        res.redirect('/home');
    });
});

app.post('/apply', function(req,res){
    var temp = new application({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        GPA: req.body.GPA,
        useremail: req.session.useremail
    });;
    temp.save(function (err) {if (err) console.log ('Error on save!')});
    console.log("saved " + req.session.useremail + " application")  ;
    res.redirect('/home');
});

app.post('/reapply', function(req,res){
    application.find({useremail: req.session.useremail}, function(err, application){
        if(err||application.length== 0){
            res.redirect('/home');
            return;
        } else
        {
          application[0].remove();
            res.redirect('/home');
            return;
        }
    });

    });
};