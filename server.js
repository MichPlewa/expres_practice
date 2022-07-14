const express = require('express');
const path = require('path');
const uuid = require('uuid').v4;

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.get('/testimonials', (req, res) => {
  res.send(db);
  res.json({ message: 'Ok' });
});

app.get('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  if (id === 'random') {
    res.send(db[Math.floor(Math.random() * db.length)]);
    res.json({ message: 'Ok' });
  } else {
    res.send(db.find((item) => item.id === id - 1));
    res.json({ message: 'Ok' });
  }
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = uuid();
  const newTestimonial = { id: id, author, text };
  db.push(newTestimonial);
  res.json({ message: 'Ok' });
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;
  const testimonials = db.find((item) => item.id === id);
  testimonials.author = author;
  testimonials.text = text;
  res.json({ message: 'Ok' });
});

app.delete('/testimonials/:id', (res, req) => {
  const id = res.params.id;
  db.splice(db.findIndex((item) => item.id === id));
  res.json({ message: 'Ok' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'error' });
});

app.listen(8000, () => {
  console.log('Running on Port 8000');
});

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: 2,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
];
