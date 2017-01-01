require('./app/index');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = 3000;
const chalk = require('chalk');
const bodyParser = require('body-parser')

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
const mongoUri = "mongodb://localhost:27017/tutorial";
mongoose.connect(mongoUri);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

const gulp = require('gulp');
gulp.task('default', function() {
  // place code for your default task here
});


var babel = require("gulp-babel");

app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const crawlRSSController = require('./controllers/rss');
const streamController = require('./controllers/stream');

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


app.get('/', function(request, response) {
  response.send('Hello from Express!');
})

app.listen(port, function(err) {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
})
