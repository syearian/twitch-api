var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "comster404", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"]
var logo = "";
var noLogo = "https://static-cdn.jtvnw.net/jtv-static/404_preview-50x50.png";
var name = "";
var stream = "";
var channel = "";

function getLogo(user, name, stream, channel) {
  var getUserUrl = 'https://api.twitch.tv/kraken/users/' + user + '?callback=?'
  channel = "https://www.twitch.tv/" + user;
  $.getJSON(getUserUrl, {})
    .done(function(json) {
      if (json.logo === null) {
        logo = noLogo;
      } else {
      logo = json.logo;
      }
      placeContent(logo, name, stream, channel);
    });
}

function placeContent(logo, name, stream, channel) {
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
  $.getJSON(getStreamUrl, {})
    .done(function(data) {
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
      getLogo(user, name, stream, channel);
    });
}

$(document).ready(function() {
  for (key in usernames) {
    getContent(usernames[key]);
  };
});