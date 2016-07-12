var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "comster404", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"]
var logo = "https://static-cdn.jtvnw.net/jtv-static/404_preview-50x50.png";
var name = "";
var stream = "";
var channel = "";

function getLogo(user) {
}

function placeContent(user) {
  if (user === "comster404" || user === "brunofin") {
    logo = "https://static-cdn.jtvnw.net/jtv-static/404_preview-50x50.png";
  } else {
    var getUserUrl = 'https://api.twitch.tv/kraken/users/' + user + '?callback=?'
    $.getJSON(getUserUrl, function(json) {
      logo = json.logo;
    });
  }
      console.log(logo);
  if (stream === "Offline") {
    $('#streamerList').append('<a href="' + channel + '" class="list-group-item list-group-item-info"><div class="row"><div class="col-xs-2 col-sm-1 text-center"><img src="' + logo + '" alt="logo"></div><div class="col-xs-3 col-sm-2 text-center"><p class="list-group-item-text">' + name + '</p></div><div class="col-xs-7 col-sm-9 text-center"><p class="list-group-item-text">' + stream + '</p></div></div></a>');
  } else if (stream === "Account Closed") {
    $('#streamerList').append('<a href="' + channel + '" class="list-group-item list-group-item-danger"><div class="row"><div class="col-xs-2 col-sm-1 text-center"><img src="' + logo + '" alt="logo"></div><div class="col-xs-3 col-sm-2 text-center"><p class="list-group-item-text">' + name + '</p></div><div class="col-xs-7 col-sm-9 text-center"><p class="list-group-item-text">' + stream + '</p></div></div></a>');
  } else {
    $('#streamerList').prepend('<a href="' + channel + '" class="list-group-item list-group-item-success"><div class="row"><div class="col-xs-2 col-sm-1 text-center"><img src="' + logo + '" alt="logo"></div><div class="col-xs-3 col-sm-2 text-center"><p class="list-group-item-text">' + name + '</p></div><div class="col-xs-7 col-sm-9 text-center"><p class="list-group-item-text">' + stream + '</p></div></div></a>');
  }
}

function getContent(user) {
  var getStreamUrl = 'https://api.twitch.tv/kraken/streams/' + user + '?callback=?'
  $.getJSON(getStreamUrl, function(data) {
    if (!(data.status === 422)) {
      if (data.stream === null) {
        stream = "Offline";
      } else {
        stream = data.stream.game;
      }
    } else {
      stream = "Account Closed"
    }
    if (data.display_name) {
      name = data.display_name;
    } else {
      name = user;
    }
    // if (data.stream.channel.logo) {
    //   logo = data.stream.channel.logo;
    // }
    channel = "https://www.twitch.tv/" + user;
    placeContent(user);
  });
}

$(document).ready(function() {
  for (key in usernames) {
    getContent(usernames[key]);
  };
});