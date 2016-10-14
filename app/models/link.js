var crypto = require('crypto');
var mongoose = require('mongoose');


var linkSchema = mongoose.Schema({url: String, 
                                  baseUrl: String, 
                                  code: String, 
                                  title: String, 
                                  visits: Number,
                                  link: String,});

var Link = mongoose.model('Link', linkSchema);

function createSHA(url){
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
}

linkSchema.pre('save',function(next){
  var code = createSHA(this.url);
  this.code = code;
  next();
});

module.exports = Link;
