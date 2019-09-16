// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');
var cors = require('cors');
var favicon = require('serve-favicon');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var clientID = "561644251700-snvlvqt2alp79livs561mb51ft59vlrt.apps.googleusercontent.com";
var clientSecret = "fJVY17hdubxr3fPsiscYYAC4";
var clientInfo = {id: -1, name: "0", image: ""};
var app = express();
//app.use(favicon('831da1ea-1e50-4148-9a1d-b5e53a712f89%2Ffavicon.ico?v=1568599722423.1'));
//app.use(favicon(__dirname + '831da1ea-1e50-4148-9a1d-b5e53a712f89%2Ffavicon.ico?v=1568599722423.1'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret:'google secret', resave:false, saveUninitialized:true}));
app.use(passport.initialize());
app.use(express.static('public'));
app.use(passport.session());
app.use(cors());

app.get('/cors-entry', function (req, res, next) {
  console.log('CORS Accessed');
  res.json({msg: 'Odd Blog is CORS-enabled for all origins!'})
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "https://a3-dandaman2.glitch.me/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       // User.findOrCreate({ googleId: profile.id }, function (err, user) {
         // return done(err, user);
       // });
    console.log('user coming in...');
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  console.log('serialize\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\', user);
  clientInfo = extractProfile(user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserialize////////////////////////////', user);
  clientInfo = extractProfile(user);
  done(null, user);
});



// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE Webdata (title TEXT, date TEXT, body TEXT, user TEXT, id TEXT, userId TEXT)');
    console.log('New table Webdata created!');
    
    // insert default dreams
    db.serialize(function() {
      db.run('INSERT INTO Webdata (title, date, body, user, id, userId) VALUES ("First Post!", "Before Time Began", "This is an example body! Feel free to log in and create your own posts!", "Danny Duff", "_5", "555")');
    });
  }
  else {
    console.log('Database "Webdata" ready to go!');
    //db.run('DROP TABLE Webdata');
    
    db.each('SELECT * from Webdata', function(err, row) {
      if ( row ) {
        console.log('record:', row);
      }
    });
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  //console.log(clientInfo, 'request', request.user);
  response.sendFile(__dirname + '/views/index.html');
});

// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
app.get('/getPosts', function(request, response) {
  console.log('requested user:', request.user);
  clientInfo = extractProfile(request.user);
  
  db.all('SELECT * from Webdata', function(err, rows) {
    response.send(JSON.stringify({"rows":rows, "userData": clientInfo}));
  });
});

app.post('/addToDb', function (req, res) {
  
  console.log(req.body.title, 'coming in');
  
  let ri = req.body;
  let runString = 'INSERT INTO Webdata (title, date, body, user, id, userId) VALUES ';
  runString += '( "' + ri.title + '" , "' + ri.date + '", "' + ri.body + '", "' + ri.user + '", "' + ri.id + '", "' + ri.userId+'")';
  db.run(runString);
  let returnedValue = 'Got it: ' + ri.title;
  res.json({respVal: returnedValue});
});


app.post('/removeFromDb', function (req, res) {
  console.log(req.body.id, 'deleting');
  let runString = "DELETE FROM Webdata WHERE id = '" + req.body.id + "'";
  db.run(runString);
  res.json({respVal: "deleted: " + req.body.id});
});

app.post('/logout', function(req, res){
  req.session.destroy();
  res.json({respVal: "logged out " + req.user.id});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

function extractProfile(profile) {
  if(!profile){
    return {
      id: -1,
      name: "0",
      image: ""
    }
  }
  
  let imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    id: profile.id,
    name: profile.displayName,
    image: imageUrl,
  };
}
