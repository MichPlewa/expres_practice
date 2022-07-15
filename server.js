const express = require('express');
const db = require('./db');
const path = require('path');
const uuid = require('uuid').v4;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  if (id === 'random') {
    res.send(
      db.testimonials[Math.floor(Math.random() * db.testimonials.length)]
    );
  } else {
    res.json(db.testimonials.find((item) => item.id === parseInt(id)));
  }
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.query;
  const id = uuid();
  const newTestimonial = { id: id, author, text };
  db.testimonials.push(newTestimonial);
  res.json(db.testimonials);
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.query;
  const id = req.params.id;
  const testimonials = db.testimonials.find((item) => item.id === parseInt(id));
  testimonials.author = author;
  testimonials.text = text;
  res.json(db.testimonials);
});

app.delete('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  db.testimonials.splice(
    db.testimonials.findIndex((item) => item.id === parseInt(id)),
    1
  );
  res.json({ message: 'ok' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'error' });
});

app.listen(8000, () => {
  console.log('Running on Port 8000');
});
