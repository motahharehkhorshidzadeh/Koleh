
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('host', '0.0.0.0');

app.post('/submit-traveler', (req, res) => {
  console.log('Traveler Data:', req.body);
  res.send('Thank you, traveler!');
});

app.post('/submit-sender', (req, res) => {
  console.log('Sender Data:', req.body);
  res.send('Thank you for your submission!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
