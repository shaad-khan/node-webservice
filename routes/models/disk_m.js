var mongoose=require('mongoose');

var Schema = mongoose.Schema;

var general = new Schema({
    servername:  String,
    Type: String,
    Client:   String,
    Data: [{Mount_Point:String,Total_space:String,Used_space:String,Free_space:String}],
    Date: { type: Date, default: Date.now },
    Flag:{ type:Number,default: 0},
   
  });

  var Disk_check = mongoose.model('Disk_check',general);

  module.exports={Disk_check};