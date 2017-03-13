var mongoose = require('mongoose');

var Marker = new mongoose.Schema({
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

Marker.statics.findOneAndReplace = function (filter, replacement, options) {
  return this.collection.findOneAndReplace(filter, replacement, options);
};

module.exports = mongoose.model('Markers', Marker);