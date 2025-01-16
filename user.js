const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nom: { type: String },
    age: Number,
    favoriteFoods: [String]
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
