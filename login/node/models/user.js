const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fname: {
    type: String,
  },
  mono: {
    type: Number
  },
  addr: {
    type: String
  }
});

const User = module.exports = mongoose.model('User', UserSchema);


module.exports.create = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = (username, callback) => {
  const query = { username: username }
  User.findOne(query, callback);
}


module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
}


module.exports.compare = (candidatePassword, hash, callback) =>{
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

