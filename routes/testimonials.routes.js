const express = require('express');
const router = express.Router();
const { testimonials } = require('../db');
const uuid = require('uuid').v4;

router.route('/testimonials').get((req, res) => {
  res.json(testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  const id = req.params.id;
  if (id === 'random') {
    res.send(testimonials[Math.floor(Math.random() * testimonials.length)]);
  } else {
    res.json(testimonials.find((item) => item.id === parseInt(id)));
  }
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.query;
  const id = uuid();
  const newTestimonial = { id: id, author, text };
  testimonials.push(newTestimonial);
  res.json(testimonials);
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.query;
  const id = req.params.id;
  const editTestimonials = testimonials.find(
    (item) => item.id === parseInt(id)
  );
  editTestimonials.author = author;
  editTestimonials.text = text;
  res.json(testimonials);
});

router.route('/testimonials/:id').delete((req, res) => {
  const id = req.params.id;
  testimonials.splice(
    testimonials.findIndex((item) => item.id === parseInt(id)),
    1
  );
  res.json({ message: 'ok' });
});

module.exports = router;
