
const fs = require("fs");
const utility = require("./utility");

exports = module.exports = function (preference) {
  this.settings = preference;

  return this;
};
