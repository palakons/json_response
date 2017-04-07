// Include the cluster module
var cluster = require('cluster');
var http = require('http');
var https = require('https');
var url = require('url');
var extend = require('extend');
var URL = require('url').URL;
var ddbTable = process.env.TRAINING_IMAGE_TABLE || 'chronos-palakons';

// Code to run if we're in the master process
if (cluster.isMaster) {
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;
    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    // Listen for terminating workers
    cluster.on('exit', function (worker) {
        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });
    // Code to run if we're in a worker process
} else {
    var AWS = require('aws-sdk');
    AWS.config.region = process.env.REGION || 'us-east-1';//'us-west-2';// 
    var ddb = new AWS.DynamoDB();
    
    var express = require('express');
    var bodyParser = require('body-parser');
    var app = express();

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '5mb' }))
    app.use(express.static('static'));



    var port = process.env.PORT || 3000;

    var server = app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    });

    app.get('/', function (req, res) {
        //console.log('Called form User-Agent: ' + req.headers['user-agent']);
        console.log('Called / form User-Agent: ' + JSON.stringify(req.headers, null, 2));
        res.render('index', {
            static_path: 'static',
            theme: process.env.THEME || 'flatly',
            flask_debug: process.env.FLASK_DEBUG || 'false'
        });
    });
    app.get('/healthcheck', function (req, res) {
        console.log('Called /healthcheck form User-Agent: ' + JSON.stringify(req.headers, null, 2));
        res.status(200).json(extend({ 'status': 'successful' }, req.body));
    });
    app.post('/update', function (req, res) {
        console.log('Called /update form User-Agent: ' + JSON.stringify(req.headers, null, 2));
        var data = { time_ms: { N: Date.now().toString()}, 
        cpu_id: { S: req.body.id }, 
        status: { S: req.body.status }  };
        res.status(200).json(extend(putinDB(ddb, ddbTable, data), req.body));
    });
    function putinDB(dDB, ddbTableName, data) {

        var params = {
            'TableName': ddbTableName,
            'Item': data
        };
        console.log('Data to in put: ',JSON.stringify(params, null, 2));
        dDB.putItem(
            params
            , function (err, data) {
                if (err) {
                    console.log('DDB Error: ' + err);
                    return extend({ status: error }, err);
                } else {
                    console.log('Put data OK');
                    return { status: success };
                }
            });
    }
}