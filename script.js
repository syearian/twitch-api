var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
var logo = "";
var name = "";
var stream = "";

function getLogo(user) {
  var getLogoUrl = 'https://api.twitch.tv/kraken/users/' + user + '?callback=?'
  $.getJSON(getLogoUrl, function(data) {
    console.log(data);
    if (data.logo === null) {
      logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
      name = data.display_name;
    } else {
      logo = data.logo;
      name = data.display_name;
    }
  });
}

function getStream(user) {
  var getStreamUrl = 'https://api.twitch.tv/kraken/streams/' + user + '?callback=?'
  $.getJSON(getStreamUrl, function(data) {
    console.log(data);
    if (!(data.status === 422)) {
      getLogo();
      if (data.stream === null) {
        stream = "Offline";
      } else {
        stream = data.stream.game;
      }
    } else {
      getLogo();
      stream = "Account Closed"
    }
  });
}

$(document).ready(function() {
  $.each(usernames, function(key, val) {
    
  });
});