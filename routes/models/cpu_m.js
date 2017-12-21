var mongoose=require('mongoose');

var Schema = mongoose.Schema;

var general = new Schema({
    servername:  String,
    Type: String,
    Client:   String,
    Data: Number,
    Date: { type: Date, default: Date.now },
    Tmax: Number,
    Flag:{ type:Number,default: 0},
   Tmin:Number
  });

  var Cpu = mongoose.model('Cpu_monitor',general);

  module.exports={Cpu};