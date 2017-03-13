var mongoose = require('mongoose');

module.exports = mongoose.model('Markers', {
    id: String,
    title: String,
    description: String,
    projectname: String,
    duration: Number,
    tags: [String],
    incidents: [{
        time: Number,
        category: String,
        description: String
    }]
});