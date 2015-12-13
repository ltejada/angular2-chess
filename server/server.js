#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var util = require('util');

// To connect to the database, define the variable MONGO_URL in your .bashrc
var db = require('./db')(process.env.MONGO_URL_CHESS)
console.log('URL: ',process.env.MONGO_URL_CHESS)

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

// populate the data model
var dm = require('./data_model')(db, function(data) {
    console.log('data loaded: ',util.inspect(data))
})
console.log("DataModel: ", util.inspect(dm))

var public_folder = path.join(__dirname, '/public');
console.log("Serving: "+public_folder);
app.use(express.static(public_folder));

// the api uses the mongoose defined schemas
api_router = require('./routes')(express, db, dm);
app.use('/api', api_router);

// Default route to index.html
//app.get('/*', function(req, res) {
//    res.sendFile(public_folder+"/index.html")
//})

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;;
var host = process.env.OPENSHIFT_NODEJS_IP || "localhost";


var app_server = app.listen(port, host, function() {
    console.log('listening on http://%s:%s', host, port)    
});
