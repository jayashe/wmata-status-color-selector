const request = require('request');

const options = {
  url: 'https://api.wmata.com/Incidents.svc/json/Incidents',
  headers: {
    'api_key': `${process.env.WMATA_API_KEY}`
  },
  method: 'GET'
};

const colorMap = {
  "RD": "#FF0000",
  "BL": "#0000FF",
  "GR": "#00FF00",
  "OR": "#FFA500",
  "YL": "#FFFFE0",
  "SV": "#FFFFFF"
}

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    const info = JSON.parse(body);
    const set = new Set();
    info.Incidents.forEach(function(incident) {
      lines = incident.LinesAffected.split(";");
      lines.forEach(function(line) {
        line = line.trim();
        if (line != '' && colorMap[line]) {
          set.add(colorMap[line]);
        }
      });
    });
    set.forEach(function(color) {
      sendAlert(color);
    });
  } else {
    console.log(error);
  }
}

function sendAlert(color) {
  console.log(color);
}

request(options, callback);
