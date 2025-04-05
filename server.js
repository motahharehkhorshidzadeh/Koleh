
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('host', '0.0.0.0');

// Path to data.json
const dataPath = path.join(__dirname, 'data.json');

// Read data from file
function readData() {
  const raw = fs.readFileSync(dataPath);
  return JSON.parse(raw);
}

// Write data to file
function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Traveler form handler
app.post('/submit-traveler', (req, res) => {
  const data = readData();
  data.travelers.push(req.body);
  writeData(data);
  res.send('Traveler data saved successfully!');
});

// Sender form handler
app.post('/submit-sender', (req, res) => {
  const data = readData();
  data.senders.push(req.body);
  writeData(data);
  res.send('Sender data saved successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
