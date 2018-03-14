const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String
});

var Users = mongoose.model('user', userSchema);

module.exports = Users;