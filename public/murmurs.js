var api = 'http://localhost:2017';

var nmurmurs = 0;
function present_murmur(time, source, content)
{
    var text = "";
    text += '<div class="panel panel-default">';
        text += '<div class="panel-heading">';
            text += '<h4>#'+nmurmurs+' <small>'+time+'</small></h4>';
        text += '</div>';
        text += '<div class="panel-body">'+content+'</div>';
        text += '<div class="panel-footer"><cite title="'+source+'">'+source+'</cite></div>';
    text += '</div>';
    $("#murmurs-container").append(text);
    nmurmurs++;
    return text;
}

function align2digits(num)
{
  var prefix = "";
  if( num < 10 )
    prefix = "0";
  return prefix+num;
}

function format_time_string(timestamp)
{
    var d = new Date(timestamp);
    var str = "" + d.getUTCFullYear();
    str += "-" + align2digits(d.getUTCMonth()+1);
    str += "-" + align2digits(d.getUTCDate());
    str += " " + align2digits(d.getUTCHours());
    str += ":" + align2digits(d.getUTCMinutes());
    str += ":" + align2digits(d.getUTCSeconds());
    str += " GMT";
    return str;
}

function load_murmurs()
{
    $.getJSON( api + "/8", function (data) {
        $("#murmurs-container").empty();
        for(var i = 0;i < data.length;++i)
            if( data[i] )
                present_murmur(format_time_string(data[i].t), data[i].s, marked(data[i].c));
    });
}
