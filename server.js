const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.get('/testimonials', (req, res) => {
  res.send(db);
});

app.get('/testimonial/:id', (req, res) => {
  res.send(findById(parseInt(req.params.id), db));
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

const findById = (id, data) => data.find((item) => item.id === id);
