var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// ==BP: SETUP KNEX AND OBJECTION DATABASE
// Initialize knex.
var config = require('./knexfile')[process.env.NODE_ENV || "development"];
var knex = require("knex")(config);

// // =====Require Objection.js
// // Bind all Models to a knex instance. If you only have one database in your server this is all you have to do. For multi database systems, see the Model.bindKnex method.
var Model = require('objection').Model;
Model.knex(knex);
// =================

var app = express();

// ===BP: EXPRESS-HANDLEBARS
app.engine('hbs', require('express-handlebars')({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// ===BP: NODE-SASS-MIDDLEWARE
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed'
}));

app.use(express.static(path.join(__dirname, 'public')));

// ===BP: REQUIRE ROUTES
app.use(require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
