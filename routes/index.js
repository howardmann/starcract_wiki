var express = require('express');
var router = express.Router();

var users = require('./users.js');
var posts = require('./posts.js');

var races = require('./races.js');
var heroes = require('./heroes.js');
var planets = require('./planets.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express-Boilerplate' });
});

// USERS CRUD SERVER-SIDE FORMAT
router
  .get('/users', users.index)
  .get('/users/new', users.new)
  .post('/users', users.create)
  .get('/users/:id', users.show)
  .get('/users/:id/edit', users.edit)
  .put('/users/:id', users.update)
  .delete('/users/:id', users.destroy);

// POSTS CRUD API FORMAT
router
  .get('/posts', posts.index)
  .post('/posts', posts.create)
  .get('/posts/:id', posts.show)
  .put('/posts/:id', posts.update)
  .delete('/posts/:id', posts.destroy);

// USER NESTED ROUTES
router
  .get('/users/:id/posts/new', posts.newUser)
  .post('/users/:id/posts', posts.createUser);

// STARCRAFT WIKI - RACES API
router
  .get('/races', races.index)
  .get('/races/:id', races.show)
  .post('/races', races.create)
  .put('/races/:id', races.update)
  .delete('/races/:id', races.destroy);

// STARCRAFT WIKI - HEROES API
router
  .get('/heroes', heroes.index)
  .get('/heroes/:id', heroes.show)
  .post('/heroes', heroes.create)
  .put('/heroes/:id', heroes.update)
  .delete('/heroes/:id', heroes.destroy);

// STARCRAFT WIKI - PLANETS STATIC HTML
router
  .get('/planets', planets.index)
  .get('/planets/new', planets.new)
  .get('/planets/:id', planets.show)



module.exports = router;
