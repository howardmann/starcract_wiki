var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');
var should = chai.should();

var config = require('../knexfile')[process.env.NODE_ENV || "development"];
var knex = require("knex")(config);

chai.use(chaiHttp);

describe('Races', function() {

  // Before each test we rollback the migrations and run the seed file again
  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  it('should list ALL races on /races GET', function(done){
    chai.request(app)
      .get('/races')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(3);
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('terran');
        res.body[0].should.have.property('description');
        res.body[0].description.should.equal('The terrans are a young species with psionic potential. The terrans of the Koprulu sector descend from the survivors of a disastrous 23rd century colonization mission from Earth. Compared to the protoss and zerg, the terrans are highly factionalized and endure frequent wars amongst themselves in addition to the more recent conflicts with their alien neighbors. Nevertheless, terrans stand as one of the three dominant species of the galaxy.');
        res.body[0].should.have.property('planets');
        res.body[0].planets.should.be.a('array');
        res.body[0].planets[0].should.have.property('name');
        res.body[0].planets[0].name.should.equal('korhal');
        done();
      });
  });

  it('should list a SINGLE race on /race/:id GET');
  // it('should list a SINGLE race on /race/:id GET', function(done){
    // chai.request(app)
    //   .get('/movies/2')
    //   .end(function(err, res){
    //     // For illustartion purposes different style using expect. Should and expect are both fine
    //     expect(res).to.have.status(200);
    //     expect(res).to.be.json;
    //     expect(res.body).to.be.a('object');
    //     expect(res.body).to.have.property('name');
    //     expect(res.body.name).to.equal('Prestige');
    //     expect(res.body).to.have.property('director');
    //     expect(res.body.director).to.equal('Christopher Nolan');
    //     expect(res.body).to.have.property('genre');
    //     expect(res.body.genre).to.equal('Drama');
    //     expect(res.body).to.have.property('year');
    //     expect(res.body.year).to.equal(2013);
    //     // Add associations for movie belongs to user
    //     expect(res.body).to.have.property('user');
    //     expect(res.body.user).to.be.a('object');
    //     expect(res.body.user).to.have.property('name');
    //     expect(res.body.user.name).to.equal('howie mann');
    //     expect(res.body.user).to.have.property('email');
    //     expect(res.body.user.email).to.equal('howie@email.com');
    //     done();
    //   });
  // });

  it('should add a SINGLE movie on /races POST');
  // it('should add a SINGLE movie on /races POST', function(done){
    // chai.request(app)
    //   .post('/movies')
    //   .send({
    //     name: 'The Avengers',
    //     director: 'Joss Whedon',
    //     genre: 'Action',
    //     year: 2012
    //   })
    //   .end(function(err, res){
    //     res.should.have.status(200);
    //     res.should.be.json;
    //     res.body.should.be.a('object');
    //     res.body.should.have.property('name');
    //     res.body.name.should.equal('The Avengers');
    //     res.body.should.have.property('director');
    //     res.body.director.should.equal('Joss Whedon');
    //     res.body.should.have.property('genre');
    //     res.body.genre.should.equal('Action');
    //     res.body.should.have.property('year');
    //     res.body.year.should.equal(2012);
    //     done();
    //   });
  // });

  it('should update a SINGLE race on /races/:id PUT');
  // it('should update a SINGLE race on /races/:id PUT', function(done){
    // chai.request(app)
    //   .put('/movies/1')
    //   .send({
    //     genre: 'Action'
    //   })
    //   .end(function(err, res){
    //     res.should.have.status(200);
    //     res.should.be.json;
    //     res.body.should.be.a('object');
    //     res.body.should.have.property('name');
    //     res.body.name.should.equal('Gladiator');
    //     res.body.should.have.property('director');
    //     res.body.director.should.equal('Ridley Scott');
    //     res.body.should.have.property('genre');
    //     res.body.genre.should.equal('Action');
    //     res.body.should.have.property('year');
    //     res.body.year.should.equal(2000);
    //     done();
    //   });
  // });

  it('should delete a SINGLE race on /races/:id DELETE');
  // it('should delete a SINGLE race on /races/:id DELETE', function(done){
    // chai.request(app)
    //   .delete('/movies/4')
    //   .end(function(err, res) {
    //     res.should.have.status(200);
    //     res.should.be.json;
    //     res.body.should.be.a('object');
    //     res.body.should.have.property('name');
    //     res.body.name.should.equal('Pulp Fiction');
    //     res.body.should.have.property('director');
    //     res.body.director.should.equal('Quentin Tarantino');
    //     res.body.should.have.property('genre');
    //     res.body.genre.should.equal('Noir');
    //     res.body.should.have.property('year');
    //     res.body.year.should.equal(1990);
    //     chai.request(app)
    //       .get('/movies')
    //       .end(function(err, res){
    //         res.should.have.status(200);
    //         res.should.be.json;
    //         res.body.should.be.a('array');
    //         res.body.length.should.equal(3);
    //         done();
    //       });
    //   });
  // });

});
