
const jsf = require("jsonfile");
const utility = require("./utility");

exports = module.exports = function (preference) {
  this.settings = preference;
  this.datafile = path.join(this.settings.storage, "/data.json");

  this.loadata = function () {
    return jsf.readFileSync(this.datafile);
  };

  this.reload = function () {
    this.data = this.loadata();
  };

  this.save = function () {
    jsf.writeFile(this.datafile, this.data, function (err) {
      if(err) console.error(err);
    });
  };

  this.post = function (source, content) {
    var murmur = {"t":utility.get_time(), "s":source, "c":content};
    this.reload();
    this.data.push(murmur);
    this.save();
  };

  this.get = function (amount) {   /** Randomly */
    this.reload();
    if( this.data.length <= amount )
      return this.data;
    else
    {
      var i = 0;
      var arr = [];
      var set = [];
      for(i = 0;i < this.data.length;++i)
        arr.push([Math.random(), i]);
      arr.sort();
      for(i = 0;i < amount;++i)
        set.push( this.data[arr[i][1]] );
      return set;
    }
  };

  return this;
};
