const express = require('express');
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/build')));

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'error' });
});

mongoose.connect('mongodb://localhost:27017/NewWaveDB', {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.once('open', () => console.log('Connected to the database'));
db.on('error', (err) => {
  console.log('error by connecting to database', err);
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

io = socket(server);
io.on('connection', (socket) => {
  console.log('New socket: ', socket.id);
});
