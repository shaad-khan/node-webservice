var mongoose=require('mongoose');

var Schema = mongoose.Schema;

var general = new Schema({
    servername : String,
    client : String,
    domain : String,
    pshome : String,
    pscfghome : String,
    PRCS : String
   
  });

  var Appconfig = mongoose.model('Appconfig',general);

  module.exports={Appconfig};