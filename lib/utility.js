
function align2digits(num)
{
  var prefix = "";
  if( num < 10 )
    prefix = "0";
  return prefix+num;
}

exports.get_time_string = function () {
  var d = new Date();
  var str = "" + d.getUTCFullYear();
  str += "-" + align2digits(d.getUTCMonth()+1);
  str += "-" + align2digits(d.getUTCDate());
  str += " " + align2digits(d.getUTCHours());
  str += ":" + align2digits(d.getUTCMinutes());
  str += ":" + align2digits(d.getUTCSeconds());
  str += " GMT";
  return str;
};
