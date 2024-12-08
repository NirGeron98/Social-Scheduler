const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const meetings = {}; // Simulated in-memory database

// Create a new meeting
app.post('/meetings', (req, res) => {
  const { code, name } = req.body;
  meetings[code] = { name, participants: [], recommendedSlot: null };
  res.status(201).send({ message: 'Meeting created successfully', code });
});

// Get meeting by code
app.get('/meetings/:code', (req, res) => {
  const { code } = req.params;
  if (!meetings[code]) {
    return res.status(404).send({ error: 'Meeting not found' });
  }
  res.send(meetings[code]);
});

// Add participant to a meeting
app.post('/meetings/:code/participants', (req, res) => {
  const { code } = req.params;
  const { name, availableSlots } = req.body;

  if (!meetings[code]) {
    return res.status(404).send({ error: 'Meeting not found' });
  }

  meetings[code].participants.push({ name, availableSlots });
  res.send({ message: 'Participant added successfully' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
