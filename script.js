var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
var logo = "";
var name = "";
var stream = "";
var channel = "";

function getLogo(user) {
  var getLogoUrl = 'https://api.twitch.tv/kraken/users/' + user + '?callback=?'
  $.getJSON(getLogoUrl, function(json) {
    console.log(json);
    if (json.logo === null) {
      logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
      name = json.display_name;
    } else {
      logo = json.logo;
      name = json.display_name;
    }
  });
}

function placeContent() {
  if (stream === "Offline") {
    $('streamerList').append('<a href="' + channel + '" class="list-group-item list-group-item-info"><div class="row"><div class="col-xs-2 col-sm-1 text-center"><img src="' + logo + '" alt="logo"></div><div class="col-xs-3 col-sm-2 text-center"><p class="list-group-item-text">' + name + '</p></div><div class="col-xs-7 col-sm-9 text-center"><p class="list-group-item-text">' + stream + '</p></div></div></a>');
  } else if (stream === "Account Closed") {
    $('streamerList').append('<a href="' + channel + '" class="list-group-item list-group-item-danger"><div class="row"><div class="col-xs-2 col-sm-1 text-center"><img src="' + logo + '" alt="logo"></div><div class="col-xs-3 col-sm-2 text-center"><p class="list-group-item-text">' + name + '</p></div><div class="col-xs-7 col-sm-9 text-center"><p class="list-group-item-text">' + stream + '</p></div></div></a>');
  } else {
    $('streamerList').prepend('<a href="' + channel + '" class="list-group-item list-group-item-success"><div class="row"><div class="col-xs-2 col-sm-1 text-center"><img src="' + logo + '" alt="logo"></div><div class="col-xs-3 col-sm-2 text-center"><p class="list-group-item-text">' + name + '</p></div><div class="col-xs-7 col-sm-9 text-center"><p class="list-group-item-text">' + stream + '</p></div></div></a>');
  }
}

function getStream(user) {
  var getStreamUrl = 'https://api.twitch.tv/kraken/streams/' + user + '?callback=?'
  $.getJSON(getStreamUrl, function(data) {
    console.log(data);
    if (!(data.status === 422)) {
      getLogo(user);
      if (data.stream === null) {
        stream = "Offline";
      } else {
        stream = data.stream.game;
      }
    } else {
      getLogo(user);
      stream = "Account Closed"
    }
    placeContent();
  });
}

$(document).ready(function() {
  $.each(usernames, function(key, val) {
    
  });
});