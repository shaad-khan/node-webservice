var express=require('express');
var app=express();
var cpu = require('./routes/cpu_check');
var db = require('./routes/db');
var disk = require('./routes/disk_check');
const path=require('path');
var appserver = require('./routes/appserver');
var prcs = require('./routes/prcs');
var aconfig=require("./routes/aconfig");
var sqlcheck=require("./routes/sqlcheck");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/Trackserve';
app.use(express.static(__dirname + "dist"));
var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// parse application/json
app.use(bodyParser.json());
console.log(process.env.port);
var port = process.env.port || 30012;

app.use('/cpu', cpu);
app.use('/db', db);
app.use('/disk', disk);
app.use('/appserver', appserver);
app.use('/aconfig', aconfig);
app.use('/prcs', prcs);
app.use('/sqlcheck', sqlcheck);
app.get("*",(req,res)=>{

res.sendFile(path.join(__dirname,'dist/index.html'));
});
app.listen(30012, function () {
  console.log('app listening on port 30012!')
})