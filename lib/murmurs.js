
const jsf = require("jsonfile");
const utility = require("./utility");

exports = module.exports = function (preference) {
  this.settings = preference;
  this.datafile = this.settings.storage + "/data.json";

  this.loadata = function () {
    return jsf.readFileSync(this.datafile);
  };
  this.data = this.loadata();

  this.reload = function () {
    this.data = this.loadata();
  };

  return this;
};
