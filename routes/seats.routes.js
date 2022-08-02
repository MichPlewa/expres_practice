const express = require('express');
const uuid = require('uuid').v4;
const { seats } = require('../db');

const router = express.Router();

router.route('/seats').get((req, res) => {
  res.json(seats);
});

router.route('/seats/:id').get((req, res) => {
  const id = req.params.id;
  if (id === 'random') {
    res.send(seats[Math.floor(Math.random() * seats.length)]);
  } else {
    res.json(seats.find((item) => item.id === parseInt(id)));
  }
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.query;
  const id = uuid();
  const newSeat = { id: id, day, seat, client, email };
  if (
    !seats.some((seat) => seat.day == newSeat.day && seat.seat == newSeat.seat)
  ) {
    seats.push(newSeat);
    req.io.emit('seatsUpdated', seats);
    res.json({ message: 'ok' });
  } else {
    res.json({ message: 'The slot is already taken...' });
    res.status(409).json({ message: 'The slot is already taken...' });
  }
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.query;
  const id = req.params.id;
  const editSeats = seats.find((item) => item.id === parseInt(id));
  editSeats.day = day;
  editSeats.seat = seat;
  editSeats.client = client;
  editSeats.email = email;
  res.json(seats);
});

router.route('/seats/:id').delete((req, res) => {
  const id = req.params.id;
  seats.splice(
    seats.findIndex((item) => item.id === parseInt(id)),
    1
  );
  res.json({ message: 'ok' });
});

module.exports = router;
