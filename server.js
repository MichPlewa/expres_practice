const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const testimonials = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

app.use((req, res) => {
  res.status(404).json({ message: 'error' });
});

app.listen(8000, () => {
  console.log('Running on Port 8000');
});
