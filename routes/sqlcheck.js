var express=require('express');
var router = express.Router();
var JSONStream = require('JSONStream');
var body=require('body-parser');
//var mongojs= require('mongojs');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/Trackserve';
router.get('/:servername',function(req,res){

//console.log("hey there");
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor =db.collection('sqlchecks').find({servername:req.params.servername,Eflag:1}).toArray(function(err, docs)
    {
     assert.equal(err, null);
    res.json({error:docs.length});
    
    });
        });


});


router.get('/:servername/:type', function (req, res) {
    
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor =db.collection('sqlchecks').find({servername:req.params.servername,Type:req.params.type}).toArray(function(err, docs)
        {
         assert.equal(err, null);
        res.json(docs);
        
        });
            });
  
    
  });

  router.get('/', function (req, res) {
    
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor =db.collection('sqlchecks').count({Eflag:1,Data:{$ne:[]},Type:{$ne:'DbBlocking'},Type:{$ne:'Master'}},function(err, docs)
        {
         assert.equal(err, null);
        res.json({count:docs});
        
        });
            });
  
    
  });

  






router.put('/:servername/:checktype/:domain',function(req,res){
    //var per=[];
    var x=parseInt(req.params.servername);
    var type=req.params.checktype;
    var domain=req.params.domain;
    var eflag=0;
//console.log(x+"   "+req.params.servername);
    var updata=req.body.Data;
    console.log(updata);
    MongoClient.connect(url, function(err, db) {
assert.equal(null, err);
if(updata.length>0)
{
eflag=1;
}
//if(updata.length>0)
//{
var cursor =db.collection('sqlchecks').update({'servername':req.params.servername,'Type':type,'Domain':domain},{$set:{Data:updata,Date:new Date(),Eflag:eflag}}, {safe:true,upsert: true },function(err, result)
{
 if (err) {
                console.log('Error updating wine: ' + err);
                res.json({'error':'An error has occurred'+err});
            } else {
                console.log('' + result + ' document(s) updated');
                res.json(result);
            }
        });
    //}
    /*else{
        res.json("{error:1}");
    }*/
     });
});

module.exports = router