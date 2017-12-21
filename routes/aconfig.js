var express = require('express')
var router = express.Router()

//var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017/Trackserve';
var JSONStream = require('JSONStream');

var {mongoose}=require('./db/mongoose');
//var {Appcheck}=require('./models/appserver_m');
var {Appconfig}=require('./models/app_config_m');
//var assert = require('assert');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/:type/:servername', function (req, res) {
      //if(req.params.type=='app')
     // {
      var query = {'servername':req.params.servername};
      //App_config.find(query)
    //console.log(req.params.type+"  "+req.params.servername);
    //res.json(req.json);
    Appconfig.find({}, function(err, data) {
        if (err) throw err;
      
        // object of all the users
        console.log(data);
        res.send(data);
      });


   /* Appconfig.find({}, function (err, data) {
        if (err) return handleError(err);
        res.send(data);
       // console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
      })
    //}*/
})
router.post('/', function (req, res) {
    // res.send('About cpu')
    console.log(req.body);
 var c=new Appconfig ({
    servername:req.body.servername,
    
   
    Client:req.body.Client,
    domain : req.body.domain,
    pshome:req.body.pshome,
    pscfghome :req.body.pscfghome,
    PRCS :req.body.PRCS
    //Date: { type: Date, default: Date.now },
    
   
 
    });
    c.save().then(()=>{
        console.log("inserted");
        res.send("{status:200}");
 
    },(e)=>{
     console.log("failed:"+e);
    });
   })


module.exports = router