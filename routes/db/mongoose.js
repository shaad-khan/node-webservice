const mongoose = require('mongoose');
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost/Trackserve', { useMongoClient: true });
module.exports={mongoose};
/*var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});*/
