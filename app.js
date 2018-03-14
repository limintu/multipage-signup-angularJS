const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// setup database connection
mongoose.connect('mongodb://limintu:12345@ds263948.mlab.com:63948/limintu_db');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Connected to MongoDB");
});

// init app
const app = express();

//bring in models
let Athlete = require('./models/athlete');

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index.html');
});

app.post('/submit', function(req, res) {
  // console.log(req.body);

  data = req.body;
  let athlete = new Athlete();

  for (let key in data) {
    athlete[key] = data[key];
  }


  if (Object.keys(data).length === 0) {
    // console.log("None!!!!");

    res.send("User data saved.");
    return;
  }

  athlete.save(function(err) {
    if (err) {
      console.log(err);
      return;
    }
    res.send("User data saved.");
  })
})

app.get('/clients', function(req, res) {
  Athlete.find({}, '_id name', function(err, athletes) {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(athletes);
    res.render('client_list', {
      athletes: athletes
    });
  });
});

app.get('/client/:id', function(req, res) {
  // console.log(req.params.id);

  Athlete.findById(req.params.id, '-_id -__v', function(err, data) {
    if (err) {
      console.log(err);
      return;
    }

    // console.log(typeof(data.dob));
    res.render('client', {
      data: JSON.stringify(data)
    });
  });
});

module.exports = app;
