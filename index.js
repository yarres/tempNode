require('./app/index');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const flash = require('express-flash');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const port = 3000;
const chalk = require('chalk');
const bodyParser = require('body-parser')
const validator = require('express-validator');

// Environment config file
dotenv.load({ path: '.env.example' });
/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
const mongoUri = "mongodb://localhost:27017/tutorial";
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

///////////////////////////////////////////////////////////////////////////////////////////:
// Setup models here for now
//var Band = mongoose.model('Band', {name: String, country: String, rank: Number});

/**
 * Lets Use our Models
 * */

//Lets create a new user
//var band1 = new Band({name: 'The Doors', country: 'usa', rank: 1});

//Some modifications in user object
//band1.name = band1.name.toUpperCase();

//Lets try to print and see it. You will see _id is assigned.
//console.log(band1);

//Lets save it
// band1.save(function (err, userObj) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('saved successfully:', userObj);
//   }
// });

const gulp = require('gulp');
gulp.task('default', function() {
  // place code for your default task here
});



var babel = require("gulp-babel");

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator()); // input validation
app.use(flash());
/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const crawlRSSController = require('./controllers/rss');
const streamController = require('./controllers/stream');
const arraysController = require('./controllers/arrays');

//express settings

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/rss', crawlRSSController.getRSS);
app.post('/rss', crawlRSSController.postRSS);
app.get('/stream', streamController.getStream);
app.get('/arrays', arraysController.getArrays);
app.post('/arrays', arraysController.postBand);


app.get('/', function(request, response) {
  response.send('Hello from Express!');
})

app.listen(port, function(err) {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
})
