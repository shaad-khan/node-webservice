var express = require('express')
var router = express.Router()

//var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017/Trackserve';
var JSONStream = require('JSONStream');

var {mongoose}=require('./db/mongoose');
var {Disk_check}=require('./models/disk_m');
//var assert = require('assert');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/:servername', function (req, res) {
    
        Disk_check.find({'Client':req.params.servername}, function(err, data) {
            if (err) throw err;
          
            // object of all the users
            console.log(data);
            res.send(data);
          }).sort({Date:-1});
  
    
  });
// define the about rout
router.get('/about', function (req, res) {
  res.send('About cpu')
})

router.post('/', function (req, res) {
   // res.send('About cpu')
   let eflag=0;
   console.log(req.body);
   for(var i = 0; i < req.body.Data.length; i++) {

if(parseInt(req.body.Data[i].Used_space) >=20 & parseInt(req.body.Data[i].Used_space) <30 )
{
   // console.log("i am here")
eflag=1;
}
else if(parseInt(req.body.Data[i].Used_space) >=30  )
{
    eflag=2;   
}
   
}
console.log(eflag);
/*var c=new Appcheck ({
   servername:req.body.servername,
   
   Type: req.body.Type,
   Client:req.body.Client,
   Data: req.body.Data,
   //Date: { type: Date, default: Date.now },
  
  Flag:eflag

   });
   c.save().then(()=>{
       console.log("inserted");
       res.send("{status:200}");

   },(e)=>{
    console.log("failed:"+e);
   });*/
   /*var c=new Diskcheck ({
    servername:req.body.servername,
    
    Type: req.body.Type,
    Client:req.body.Client,
    Data: req.body.Data,
    //Date: { type: Date, default: Date.now },
   
   Flag:eflag
 
    });*/
   var query = {"servername" : "usvaash1psdap1",
   "Type" : "Appservercheck",
   "Client" : "Advantage"};
   Disk_check.update(query, {$set:{Data: req.body.Data,Flag:eflag,Date:Date(Date.now)}}, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send(doc);
});


  })
module.exports = router