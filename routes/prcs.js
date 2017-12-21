var express = require('express')
var router = express.Router()

//var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017/Trackserve';
var JSONStream = require('JSONStream');

var {mongoose}=require('./db/mongoose');
var {Appcheck}=require('./models/appserver_m');
var {PRCS_CHECK}=require('./models/prcs_m');
//var assert = require('assert');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
router.get('/:client', async function(req, res) {
  try {
      var dict = [];
      const data1 = await PRCS_CHECK.count({'Client': req.params.client, Flag: 1});
      dict.push({error: data1});
      const data2 = await PRCS_CHECK.count({'Client': req.params.client});
      dict.push({total: data2})
      const data3 = await PRCS_CHECK.count({'Client': req.params.client, Flag: 0});
      dict.push({success: data3})
      res.json(dict);
  } catch (error) {
      next(error);
  }
});
router.get('/:client/:type', async function(req, res) {
  
 //
      PRCS_CHECK.find({'Client':req.params.client}, function(err, data) {
          if (err) throw err;
        
          // object of all the users
          console.log(data);
          res.json(data);
        })

  //}
});
router.get('/', function (req, res) {
      
      /*var query = {'servername':'app01'};
        Cpu.update(query, {$set:{'Client': 'Advantage' }}, {upsert:true}, function(err, doc){
          if (err) return res.send(500, { error: err });
          return res.send(doc);
      });*/

})
// define the about rout
router.get('/about', function (req, res) {
  res.send('About cpu')
})

router.post('/', function (req, res) {
   // res.send('About cpu')
   let eflag=0;
   console.log(req.body);
   for(var i = 0; i < req.body.Data.length; i++) {

if(req.body.Data[i].PRCSNAME=='' )
{
    console.log("res  "+req.body.Data[i].PRCSNAME)
eflag=1;
console.log(eflag);
}
//else{
  //  eflag=1;
//}
   
}
//console.log(eflag);
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
   
   var query = {"servername" : req.body.servername,
   "Type" : "prcscheck",
   "Client" : "Advantage","Domain":req.body.Domain};
   PRCS_CHECK.update(query, {$set:{Data: req.body.Data,Flag:eflag,Date:Date(Date.now)}}, {upsert:true}, function(err, doc){
     if (err) return res.send(500, { error: err });
     return res.send(doc);
 });


  })
module.exports = router