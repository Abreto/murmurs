
const fs = require("fs");
const utility = require("./utility");

/** basedir should end without '/' */
exports = module.exports = function (basedir) {
  this.prefix = basedir;
};
