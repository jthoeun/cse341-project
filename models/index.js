const mongoose = require('mongoose');
const dbConfig = require('../config/db.config'); 

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.PokemonCard = require('./pokemoncard');
db.User = require('./user');

module.exports = db;