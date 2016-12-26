var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');
var should = chai.should();

var config = require('../knexfile')[process.env.NODE_ENV || "development"];
var knex = require("knex")(config);

chai.use(chaiHttp);

// Function for before and after each test rollback migrations and run seed file again
var reset = function(done){
  knex.migrate.rollback()
    .then(function(){
      knex.migrate.latest()
      .then(function(){
        return knex.seed.run()
        .then(function(){
          done();
        })
      })
    })
};

describe('Races', function() {
  // Before and after each test we rollback the migrations and run the seed file again
  beforeEach(reset);
  afterEach(reset);

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
        res.body[0].planets[0].should.equal('korhal');
        done();
      });
  });

  it('should list a SINGLE race on /race/:id GET', function(done){
    chai.request(app)
      .get('/races/2')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('protoss');
        res.body.should.have.property('description');
        res.body.description.should.equal("The protoss, a.k.a. the Firstborn, are a sapient humanoid race native to Aiur. Their advanced technology complements and enhances their psionic mastery. The main protoss cultural groups are the Khalai, who adhere to the communal Khala, and the Nerazim, who reject the Khala. In addition, another branch of the protoss separate from the Khala called the Tal'darim lives in various places in the galaxy. Protoss civilization was reunified when the Khalai and Nerazim, sundered since the Discord, were reunited after the devastation of Aiur by the zerg during the Great War.Alongside the zerg and terrans, the protoss stand as one of the three dominant species of the Milky Way. Protoss are not found outside the Koprulu sector.");
        res.body.should.have.property('planets');
        res.body.planets[0].should.have.property('name');
        res.body.planets[0].name.should.equal('aiur');
        res.body.planets[0].should.have.property('description');
        res.body.planets[0].description.should.equal("Aiur is the protoss homeworld, located in a star system with a single yellow star and possessing a single moon not unlike Luna. It is at least the third of the system's terrestrial planets, if not further out. A great psionic matrix emanated from Aiur. Protoss structures and units, to a lesser extent, drew their energy from it. A nexus provided a link to this matrix, but pylons were needed to actually tap into the energy required to provide psionic energy to new colonies.Aiur possesses great, almost spiritual significance to all protoss.");
        done();
      });
  });

  it('should add a SINGLE movie on /races POST', function(done){
    chai.request(app)
      .post('/races')
      .send({
        name: 'Xel Naga',
        description: 'An unknown and mysterious race'
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('Xel Naga');
        res.body.should.have.property('description');
        res.body.description.should.equal('An unknown and mysterious race');
        done();
      });
  });

  it('should update a SINGLE race on /races/:id PUT', function(done){
    chai.request(app)
      .put('/races/1')
      .send({
        name: 'human'
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('human');
        done();
      });
  });

  it('should delete a SINGLE race on /races/:id DELETE', function(done){
    chai.request(app)
      .delete('/races/3')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('zerg');
        chai.request(app)
          .get('/races')
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.length.should.equal(2);
            done();
          });
      });
  });

});

describe('Heroes', function() {
  beforeEach(reset);
  afterEach(reset);

  it('should list ALL heroes on /races GET', function(done){
    chai.request(app)
      .get('/heroes')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(3);
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('Jim Raynor');
        res.body[0].should.have.property('description');
        res.body[0].description.should.equal("Jim Raynor is a former terran marshal turned rebel, who has became one of the major figures in the Koprulu sector through his work to bring down the Confederacy and, later, in the struggle against the Confederacy's successor, the Dominion. Raynor is one of the few terrans to engage in a long-term alliance with the protoss.");
        res.body[0].should.have.property('health');
        res.body[0].health.should.be.a('number');
        res.body[0].health.should.equal(100);
        res.body[0].should.have.property('attack');
        res.body[0].attack.should.be.a('number');
        res.body[0].attack.should.equal(200);
        res.body[0].should.have.property('score');
        res.body[0].score.should.be.a('number');
        res.body[0].score.should.equal(300);
        res.body[0].should.have.property('race');
        res.body[0].race.should.be.a('object');
        res.body[0].race.should.have.property('name');
        res.body[0].race.name.should.equal('terran');

        done();
      });
  });

  it('should list a SINGLE hero on /hero/:id GET', function(done){
    chai.request(app)
      .get('/heroes/2')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('Zeratul');
        res.body.should.have.property('description');
        res.body.should.have.property('health');
        res.body.should.have.property('attack');
        res.body.should.have.property('score');
        res.body.should.have.property('race');
        res.body.race.should.be.a('object');
        res.body.race.should.have.property('name');
        res.body.race.name.should.equal('protoss');
        (res.body.attack + res.body.health).should.equal(res.body.score);
        done();
      });
  });

  it('should add a SINGLE hero on /heroes POST', function(done){
    chai.request(app)
      .post('/heroes')
      .send({
        name: 'Overmind',
        description: 'The old leader of the zerg',
        health: 1000,
        attack: 2000,
        race_id: 3
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('Overmind');
        res.body.should.have.property('description');
        res.body.description.should.equal('The old leader of the zerg');
        res.body.should.have.property('health');
        res.body.should.have.property('attack');
        res.body.should.have.property('score');
        res.body.should.have.property('race');
        res.body.race.should.be.a('object');
        res.body.race.should.have.property('name');
        res.body.race.name.should.equal('zerg');
        (res.body.attack + res.body.health).should.equal(res.body.score);
        done();
      });
  });

  it('should update a SINGLE hero on /heroes/:id PUT', function(done){
    chai.request(app)
      .put('/heroes/2')
      .send({
        name: 'Zeratul The Boss'
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('Zeratul The Boss');
        res.body.should.have.property('race');
        res.body.race.should.have.property('name');
        res.body.race.name.should.equal('protoss');
        done();
      });
  });

  it('should delete a SINGLE hero on /heroes/:id DELETE', function(done){
    chai.request(app)
      .delete('/heroes/2')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('Zeratul');
        chai.request(app)
          .get('/heroes')
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.length.should.equal(2);
            done();
          });
      });
  });

});
