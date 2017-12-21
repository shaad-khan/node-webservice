var mongoose=require('mongoose');

var Schema = mongoose.Schema;

var general = new Schema({
    servername:  String,
    Type: String,
    Client:   String,
    Domain: String,
    Data: [{PRCSNAME:String}],
    Date: { type: Date, default: Date.now },
    Flag:{ type:Number,default: 0},
   
  });

  var PRCS_CHECK = mongoose.model('PRCS_CHECK',general);

  module.exports={PRCS_CHECK};
//  {"Data": [{"SERVERNAME": "PSNT"}], "servername": "usvaash1psdap1", "Client": "Advantage", "Type": "PRCS_CHECK", "Domain": "HR92QA"}