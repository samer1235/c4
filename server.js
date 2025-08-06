const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let lastLocation = null;

app.post('/location', (req, res) => {
  const { latitude, longitude } = req.body;
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    lastLocation = { latitude, longitude, timestamp: new Date() };
    console.log(`Received: ${latitude}, ${longitude}`);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.get('/location', (req, res) => {
  if (lastLocation) {
    res.json(lastLocation);
  } else {
    res.status(404).send('No location available');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
