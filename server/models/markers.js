var mongoose = require('mongoose');

module.exports = mongoose.model('Markers', {
    id: String,
    name: String,
    duration: Number,
    time: Number    
});