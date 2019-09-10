const mongoose = require('mongoose');

module.exports = function() {

    const url = 'mongodb://localhost/jwt-demo';
    mongoose.connect(url, { useNewUrlParser: true });

};