const express = require('express');
const { concerts } = require('../db');
const uuid = require('uuid').v4;

const router = express.Router();

router.route('/concerts').get((req, res) => {
  res.json(concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const id = req.params.id;
  if (id === 'random') {
    res.send(concerts[Math.floor(Math.random() * concerts.length)]);
  } else {
    res.json(concerts.find((item) => item.id === parseInt(id)));
  }
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.query;
  const id = uuid();
  const newConcerts = { id: id, performer, genre, price, day, image };
  concerts.push(newConcerts);
  res.json(concerts);
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.query;
  const id = req.params.id;
  const editConcerts = concerts.find((item) => item.id === parseInt(id));
  editConcerts.performer = performer;
  editConcerts.genre = genre;
  editConcerts.price = price;
  editConcerts.day = day;
  editConcerts.image = image;
  res.json(concerts);
});

router.route('/concerts/:id').delete((req, res) => {
  const id = req.params.id;
  concerts.splice(
    concerts.findIndex((item) => item.id === parseInt(id)),
    1
  );
  res.json({ message: 'ok' });
});

module.exports = router;
