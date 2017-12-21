var express = require('express')
var router = express.Router()

//var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017/Trackserve';
var JSONStream = require('JSONStream');

var {mongoose}=require('./db/mongoose');
var {Appcheck}=require('./models/appserver_m');
var {App_config}=require('./models/app_config_m');
//var assert = require('assert');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
/*router.get('/:servername',function(req,res){
    
    //console.log("hey there");
    Appcheck.find({'servername':req.params.servername,Flag:1}, function(err, data) {
      if (err) throw err;
    
      // object of all the users
     // console.log(data);
      res.send({error:data.length});
    }).count
});*/
router.get('/:client', async function(req, res) {
    try {
        var dict = [];
        const data1 = await Appcheck.count({'Client': req.params.client, Flag: 1});
        dict.push({error: data1});
        const data2 = await Appcheck.count({'Client': req.params.client});
        dict.push({total: data2})
        const data3 = await Appcheck.count({'Client': req.params.client, Flag: 0});
        dict.push({success: data3})
        res.json(dict);
    } catch (error) {
        next(error);
    }
});
router.get('/:client/:type', async function(req, res) {
    
   //
        Appcheck.find({'Client':req.params.client}, function(err, data) {
            if (err) throw err;
          
            // object of all the users
            console.log(data);
            res.json(data);
          })

    //}
});



/* -------------------- OR using promises()------------------------------------ --*/


/*router.get('/:client', async function(req, res, next) {
    var dict = [];
    Promise.resolve().then(() => {
        return Appcheck.count({'Client': req.params.client, Flag: 1});
    }).then(data1 => {
        dict.push({error: data1});
        return Appcheck.count({'Client': req.params.client});
    }).then(data2 => {
        dict.push({total: data2})
        return Appcheck.count({'Client': req.params.client, Flag: 0});
    }).then(data3 => {
        dict.push({Success: data3})
        res.json(dict);
    }).catch(error => {
        next(error);
    });
});*/

/* -------------------- OR using promises()------------------------------------ --*/

/*router.get('/:client/:type',function(req,res){
    var dict = [];
    //console.log("hey there");
    if(req.params.type=='error')
    {
    Appcheck.count({'Client':req.params.client,Flag:1}, function(err, data) {
      if (err) throw err;
    
      // object of all the users
     // console.log(data);
     
//     dict.push({error:data})
res.json({error:data});
   
     
    })
}
else if(req.params.type=='total')
{
    Appcheck.count({'Client':req.params.client}, function(err, data) {
        if (err) throw err;
      
        // object of all the users
       // console.log(data);
       
       res.json({total:data})
       
      })
    }
    else{
      Appcheck.count({'Client':req.params.client,Flag:0}, function(err, data) {
        if (err) throw err;
      
        // object of all the users
       // console.log(data);
   res.json({Success:data})
       //res.json(dict);
      });
     
     // res.json(dict);
    }
});*/
/*router.get('/:servername/:limit', function (req, res) {
    var l= parseInt(req.params.limit);
    if(l > 0)
    {
        Appcheck.find({'servername':req.params.servername}, function(err, data) {
            if (err) throw err;
          
            // object of all the users
            console.log(data);
            res.send(data);
          }).sort({Date:-1}).limit(5);
    }

    else{
        Appcheck.find({'servername':req.params.servername}, function(err, data) {
            if (err) throw err;
          
            // object of all the users
            console.log(data);
            res.send(data);
          }).sort({Date:-1}).limit(l);

    }
      /*var query = {'servername':'app01'};
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
   let eflag=0;
   console.log(req.body);
   for(var i = 0; i < req.body.Data.length; i++) {

if(req.body.Data[i].status==='Down')
{
   // console.log("i am here")
eflag=1;
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
   var c=new Appcheck ({
    servername:req.body.servername,
    
    Type: req.body.Type,
    Client:req.body.Client,
    Data: req.body.Data,
    //Date: { type: Date, default: Date.now },
   
   Flag:eflag
 
    });
   var query = {"servername" : "usvaash1psdap1",
   "Type" : "Appservercheck",
   "Client" : "Advantage",};
   Appcheck.update(query, {$set:{Data: req.body.Data,Flag:eflag,Date:Date(Date.now)}}, {upsert:true}, function(err, doc){
     if (err) return res.send(500, { error: err });
     return res.send(doc);
 });


  })
module.exports = router