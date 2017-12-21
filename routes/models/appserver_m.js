var mongoose=require('mongoose');

var Schema = mongoose.Schema;

var general = new Schema({
    servername:  String,
    Type: String,
    Client:   String,
    Data: [{status:String,Domain:String}],
    Date: { type: Date, default: Date.now },
    Flag:{ type:Number,default: 0},
   
  });

  var Appcheck = mongoose.model('Appserver_Check',general);

  module.exports={Appcheck};