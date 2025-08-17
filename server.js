// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
app.get("/api/:input", (request, response) => {
  const input = request.params.input;
  let date;

  // Try parsing input as a number (Unix timestamp)
  const timestamp = Number(input);
  if (!isNaN(timestamp)) {
    date = new Date(timestamp);
  } else {
    // Try parsing input as a date string
    date = new Date(input);
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return response.json({ error: "Invalid Date" });
  }

  // Build response object for valid date
  const responseObj = {
    unix: date.getTime(),
    utc: date.toUTCString()
  };

  response.json(responseObj);
});

// Handle empty date (current date)
app.get("/api", (request, response) => {
  const date = new Date();
  const responseObj = {
    unix: date.getTime(),
    utc: date.toUTCString()
  };
  response.json(responseObj);
});
