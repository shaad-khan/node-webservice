var express = require('express')
var router = express.Router()

//var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017/Trackserve';
var JSONStream = require('JSONStream');

var {mongoose}=require('./db/mongoose');
var {Cpu}=require('./models/cpu_m');
//var assert = require('assert');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/:servername',function(req,res){
  
  //console.log("hey there");
  Cpu.find({'servername':req.params.servername,Flag:1}, function(err, data) {
    if (err) throw err;
  
    // object of all the users
   // console.log(data);
    res.send({error:data.length});
  });
  
  
  });
router.get('/:servername/:limit', function (req, res) {
  var l= parseInt(req.params.limit);
  if(l == 0)
  {
      Cpu.find({'Client':req.params.servername}, function(err, data) {
          if (err) throw err;
        
          // object of all the users
          console.log(data);
          res.send(data);
        }).sort({Date:-1}).limit(5);
  }

  else{
      Cpu.find({'Client':req.params.servername}, function(err, data) {
          if (err) throw err;
        
          // object of all the users
          console.log(data);
          res.send(data);
        }).sort({Date:-1}).limit(l);

  }
});
// define the home page route
/*router.get('/', function (req, res) {
    Cpu.find({'servername':'app01'}, function(err, data) {
        if (err) throw err;
      
        // object of all the users
        console.log(data);
        res.send(data);
      });
      /*Cpu.find({'servername':'app01'}, function (err, data) {
        if (err) return handleError(err);
        
        data.set({ client: 'Recall' });
        data.save(function (err, updatedTank) {
          if (err) return handleError(err);
          res.send(updatedTank);
        });
      });
      var query = {'servername':'app01'};
        Cpu.update(query, {$set:{'Client': 'Advantage' }}, {upsert:true}, function(err, doc){
          if (err) return res.send(500, { error: err });
          return res.send(doc);
      });

})*/
// define the about rout
router.get('/about', function (req, res) {
  res.send('About cpu')
})

router.post('/', function (req, res) {
   // res.send('About cpu')
   console.log(req.body);
var c=new Cpu ({
   servername:req.body.servername,
   
   Type: req.body.Type,
   Client:req.body.Client,
   Data: req.body.Data,
   //Date: { type: Date, default: Date.now },
   Tmax: 70,
  Tmin: 60
  

   });
   c.save().then(()=>{
       console.log("inserted");
       res.send("{status:200}");

   },(e)=>{
    console.log("failed:"+e);
   });
  })
module.exports = router