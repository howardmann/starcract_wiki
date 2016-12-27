exports.seed = function(knex, Promise) {
  // Initial seed data
  var users = [
    {email: 'john@email.com', name: 'john smith', age: 16},
    {email: 'polly@email.com', name: 'polly paddle', age: 36},
    {email: 'mack@email.com', name: 'mack cheese', age: 26},
    {email: 'molly@email.com', name: 'molly beth', age: 18},
    {email: 'howie@email.com', name: 'howie mann', age: 23, is_admin: true},
    {email: 'pete@email.com', name: 'pete jones', age: 23}
  ];

  var posts = [
    {description: 'I love that amazing food', user_id: knex('users').where({email: 'john@email.com'}).select('id')},

    {description: 'I am the best', user_id: knex('users').where({email: 'john@email.com'}).select('id')},

    {description: 'I love that amazing food', user_id: knex('users').where({email: 'polly@email.com'}).select('id')},

    {description: 'What a time to be alive I say', user_id: knex('users').where({email: 'mack@email.com'}).select('id')},

    {description: 'Cheese is good on anything', user_id: knex('users').where({email: 'mack@email.com'}).select('id')},

    {description: 'Molly rhymes with polly', user_id: knex('users').where({email: 'molly@email.com'}).select('id')},

    {description: 'I am the boss', user_id: knex('users').where({email: 'howie@email.com'}).select('id')},

    {description: 'Petey meaty haha', user_id: knex('users').where({email: 'pete@email.com'}).select('id')}

  ];

  var races = [
    {name: 'terran', description: 'The terrans are a young species with psionic potential. The terrans of the Koprulu sector descend from the survivors of a disastrous 23rd century colonization mission from Earth. Compared to the protoss and zerg, the terrans are highly factionalized and endure frequent wars amongst themselves in addition to the more recent conflicts with their alien neighbors. Nevertheless, terrans stand as one of the three dominant species of the galaxy.'},
    {name: 'protoss', description: "The protoss, a.k.a. the Firstborn, are a sapient humanoid race native to Aiur. Their advanced technology complements and enhances their psionic mastery. The main protoss cultural groups are the Khalai, who adhere to the communal Khala, and the Nerazim, who reject the Khala. In addition, another branch of the protoss separate from the Khala called the Tal'darim lives in various places in the galaxy. Protoss civilization was reunified when the Khalai and Nerazim, sundered since the Discord, were reunited after the devastation of Aiur by the zerg during the Great War.Alongside the zerg and terrans, the protoss stand as one of the three dominant species of the Milky Way. Protoss are not found outside the Koprulu sector."},
    {name: 'zerg', description: "The Zerg Swarm is a terrifying and ruthless amalgamation of biologically advanced, arthropodal aliens. Dedicated to the pursuit of genetic perfection, the zerg relentlessly hunt down and assimilate advanced species across the galaxy, incorporating useful genetic code into their own. They are named the Swarm per their ability to rapidly create strains, and the relentless assaults they employ to overwhelm their foes."}
  ];
  // PLANETS
  var korhal = {name: 'korhal', description: "Korhal IV (often simply refered to as Korhal) is the fourth planet in the Korhal system. During the four years since the establishment of the Terran Dominion, a large portion of the planet has developed into an ecumenopolis", race_id: knex('races').where({name: 'terran'}).select('id')};

  var aiur = {name: 'aiur', description: "Aiur is the protoss homeworld, located in a star system with a single yellow star and possessing a single moon not unlike Luna. It is at least the third of the system's terrestrial planets, if not further out. A great psionic matrix emanated from Aiur. Protoss structures and units, to a lesser extent, drew their energy from it. A nexus provided a link to this matrix, but pylons were needed to actually tap into the energy required to provide psionic energy to new colonies.Aiur possesses great, almost spiritual significance to all protoss.",race_id: knex('races').where({name: 'protoss'}).select('id')};

  var char = {name: 'char', description: "It is an inhospitable volcanic planet with thick ash covering most of its surface and tainting its acrid atmosphere. The hazardous environment is further intensified by extremely high levels of cosmic radiation from its volatile pairing of binary stars. Char's elliptical orbit means whole regions of its sunward face can become molten seas during a close approach, with temporary islands forming in them due to rapid cooling as the planet swings away to the frozen outer reaches of the system.",race_id: knex('races').where({name: 'zerg'}).select('id')};

  var planets = [korhal, aiur, char];

  var heroes = [
    {name: "Jim Raynor", description: "Jim Raynor is a former terran marshal turned rebel, who has became one of the major figures in the Koprulu sector through his work to bring down the Confederacy and, later, in the struggle against the Confederacy's successor, the Dominion. Raynor is one of the few terrans to engage in a long-term alliance with the protoss.", health: 100, attack: 200,race_id: knex('races').where({name: 'terran'}).select('id')},
    {name: "Zeratul", description: "Zeratul was a revered Nerazim mystic. During the Great War, Zeratul allied with the Khalai Tassadar, despite his hatred for the Conclave that once banished his forbears. The Dark Templar personally slew the cerebrate Zasz, but in turn accidentally gave the Overmind the location of Aiur.Zeratul was manipulated by Sarah Kerrigan during the Brood War into killing the Second Overmind and Raszagal, the Dark Templar Matriarch.", health: 80, attack: 300, race_id: knex('races').where({name: 'protoss'}).select('id')},
    {name: "Sarah Kerrigan", description: "Sarah Louise Kerrigan was a psychic terran female. She began her career as a Confederate ghost and later became the second-in-command of the Sons of Korhal. Following Arcturus Mengsk's betrayal, she was captured and infested by the Zerg Swarm, ultimately becoming the self-proclaimed Queen of Blades (a.k.a. the Zerg Queen) and leader of the Swarm.", health: 300, attack: 300, race_id: knex('races').where({name: 'zerg'}).select('id')}
  ];

  // return knex('posts').del()
  // .then(function(){
  //   return knex('users').del()
  // })
  // .then(function(){
  //   return knex('users').insert(users, 'id')
  // })
  // .then(function(){
  //   return knex('posts').insert(posts, 'id');
  // });

  return Promise.join(
    knex('heroes').del(),
    knex('planets').del(),
    knex('races').del()
  )
  .then(function(){
    return knex('races').insert(races, 'id');
  })
  .then(function(){
    return knex('planets').insert(planets, 'id');
  })
  .then(function(){
    return knex('heroes').insert(heroes, 'id');
  })



};
