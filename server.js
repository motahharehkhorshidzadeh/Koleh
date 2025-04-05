const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('public'));
app.set('host', '0.0.0.0');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
