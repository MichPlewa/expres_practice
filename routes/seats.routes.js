const express = require('express');
const db = require('../db');
const uuid = require('uuid').v4;

const app = express();

const { seats } = require('../db');

app.get('/seats', (req, res) => {
  res.json(seats);
});

app.get('/seats/:id', (req, res) => {
  const id = req.params.id;
  if (id === 'random') {
    res.send(seats[Math.floor(Math.random() * seats.length)]);
  } else {
    res.json(seats.find((item) => item.id === parseInt(id)));
  }
});

app.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.query;
  const id = uuid();
  const newSeat = { id: id, day, seat, client, email };
  seats.push(newSeat);
  res.json(seats);
});

app.put('/seats/:id', (req, res) => {
  const { day, seat, client, email } = req.query;
  const id = req.params.id;
  const editSeats = seats.find((item) => item.id === parseInt(id));
  editSeats.day = day;
  editSeats.seat = seat;
  editSeats.client = client;
  editSeats.email = email;
  res.json(seats);
});

app.delete('/seats/:id', (req, res) => {
  const id = req.params.id;
  seats.splice(
    seats.findIndex((item) => item.id === parseInt(id)),
    1
  );
  res.json({ message: 'ok' });
});

module.exports = app;
