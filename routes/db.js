var express = require('express')
var router = express.Router()
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/Trackserve';
var assert = require('assert');
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor =db.collection('config').find().toArray(function(err, docs)
        {
         assert.equal(err, null);
        res.json(docs);
        
        });
    });
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About db')
})

module.exports = router