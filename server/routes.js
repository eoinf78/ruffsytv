var Marker = require('./models/markers');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

function getMarkers(res) {
    Marker.find(function (err, Markers) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(Markers);
    });
};

module.exports = function (app) {

    // get all Markers
    app.get('/api/markers', function (req, res) {
        // use mongoose to get all Markers in the database
        getMarkers(res);
    });

    // create Marker and send back all Markers after creation
    app.post('/api/markers', function (req, res) {
        req.body._id = ObjectId(req.body._id);

        Marker.findOneAndReplace(
            { id: req.body.id },
            req.body,
            { upsert : true, returnNewDocument: true }, function (err, Marker) {
        });

        getMarkers(res);
    });

    // delete a Marker
    app.delete('/api/markers/:marker_id', function (req, res) {
        Marker.remove({
            _id: req.params.marker_id
        }, function (err, Marker) {
            if (err)
                res.send(err);

            getMarkers(res);
        });
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/build/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
