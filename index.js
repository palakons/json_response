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
    var DOC = require("dynamodb-doc");
    AWS.config.region = process.env.REGION || 'us-east-1';
    var docClient = new DOC.DynamoDB();
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
        /*res.render('index', {
            static_path: 'static',
            theme: process.env.THEME || 'flatly',
            flask_debug: process.env.FLASK_DEBUG || 'false'
        });*/
        scanDB(ddb, ddbTable, res);
    });
    app.get('/healthcheck', function (req, res) {
        console.log('Called /healthcheck form User-Agent: ' + JSON.stringify(req.headers, null, 2));
        res.status(200).json(extend({ 'status': 'successful' }, req.body));
    });
    app.post('/update', function (req, res) {
        console.log('Called /update form User-Agent: ' + JSON.stringify(req.headers, null, 2));
        var data = {
            time_ms: { N: Date.now().toString() },
            cpu_id: { S: req.body.id },
            status: { S: req.body.status }
        };
        res.status(200).json(extend(putinDB(ddb, ddbTable, data), req.body));
    });

    app.get('/testDocClient', function (req, res) {
        console.log('Called /testDocClient from User-Agent: ' + JSON.stringify(req.headers, null, 2));
        // Basic Scalar Datatypes
        /*var params = {};
        params.TableName = "chronos-palakons";
        params.Item = {
            UserId: "John",
            time_ms: 21,
            Pic: docClient.StrToBin("someURI")
        };

        */var params = {};
        params.TableName = "chronos-palakons";

        // Compatible is a Map of Part to List of PartId's
        // OnSale is a BOOL type
        // Discount is a NULL type
        params.Item = {
            time_ms: 22,
            PartId: "CPU1",
            OnSale: false,
            Discount: null,
            Compatible: {
                Motherboards: ["MB1", "MB2"],
                RAM: ["RAM1"]
            }
        };
        docClient.putItem(params, pfunc);


        params = {};
        params.TableName = "chronos-palakons";
        params.Key = { time_ms: 22 }

        docClient.getItem(params, pfunc);

        res.status(200).json({ status: 'success' });
    });

    // Basic Callback
    var pfunc = function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(JSON.stringify(data, null, 2));
        }
    }
    //Scan is BAD
    function scanDB(dDB, ddbTableName, res) {
        var params = {
            TableName: ddbTableName
        };
        console.log("Scanning table.");
        var wholeTable = {
            Count: 0,
            Items: [],
            ScannedCount: 0
        };
        dDB.scan(params, onScan);
        function onScan(err, data) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Scan succeeded.");
                wholeTable = {
                    Count: wholeTable.Count + data.Count,
                    Items: wholeTable.Items.concat(data.Items),
                    ScannedCount: wholeTable.ScannedCount + data.ScannedCount
                }
                // continue scanning if we have more movies, because
                // scan can retrieve a maximum of 1MB of data
                if (typeof data.LastEvaluatedKey != "undefined") {
                    console.log("Scanning for more...");
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    ddb.scan(params, onScan);
                } else {
                    console.log("Scan done. " + wholeTable.Count + ', ' + wholeTable.Items.length + " items");
                    res.status(200).json(wholeTable.Items);
                }
            }
        }
    }
    function putinDB(dDB, ddbTableName, data) {

        var params = {
            'TableName': ddbTableName,
            'Item': data
        };
        console.log('Data to in put: ', JSON.stringify(params, null, 2));
        dDB.putItem(
            params
            , function (err, data) {
                if (err) {
                    console.log('DDB Error: ' + err);
                    return extend({ status: 'error' }, err);
                } else {
                    console.log('Put data OK');
                    return { status: 'success' };
                }
            });
    }
}