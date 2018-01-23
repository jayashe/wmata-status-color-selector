var request = require('request');


var options = {
  url: 'https://api.wmata.com/Incidents.svc/json/Incidents',
  headers: {
    'api_key': `${process.env.WMATA_API_KEY}`
  },
  method: 'GET'
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    let set = new Set();
    info.Incidents.forEach(function(incident) {
      lines = incident.LinesAffected.split(";");
      lines.forEach(function(line) {
        line = line.trim();
        if (line != '') {
          set.add(line);
        }
      });
    });
    set.forEach(function(line) {
      console.log('+++' + line + '+++');
    });
  } else {
    console.log(error);
  }
}

request(options, callback);
