
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
  const { name, email, phone, from, to, date } = req.body;

  // Check if all required fields are present
  if (!name || !email || !phone || !from || !to || !date) {
    return res.status(400).send('All fields are required!');
  }

  // Basic email validation
  if (!email.includes('@')) {
    return res.status(400).send('Please enter a valid email address');
  }

  // Phone validation (10 digits)
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).send('Please enter a valid 10-digit phone number');
  }

  const traveler = { name, email, phone, from, to, date };
  
  try {
    const data = readData();
    data.travelers.push(traveler);
    writeData(data);
    res.send('Traveler data saved successfully!');
  } catch (error) {
    res.status(500).send('Error saving data');
  }
});

// Sender form handler
app.post('/submit-sender', (req, res) => {
  const { name, email, phone, pickup, destination, package } = req.body;

  // Check if all required fields are present
  if (!name || !email || !phone || !pickup || !destination || !package) {
    return res.status(400).send('All fields are required!');
  }

  // Basic email validation
  if (!email.includes('@')) {
    return res.status(400).send('Please enter a valid email address');
  }

  // Phone validation (10 digits)
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).send('Please enter a valid 10-digit phone number');
  }

  const sender = { name, email, phone, pickup, destination, package };
  
  try {
    const data = readData();
    data.senders.push(sender);
    writeData(data);
    res.send('Sender data saved successfully!');
  } catch (error) {
    res.status(500).send('Error saving data');
  }
});

// Admin data endpoint
app.get('/admin-data', (req, res) => {
  const data = readData();
  res.json(data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
