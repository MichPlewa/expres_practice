const mongoose = require('mongoose');

const concertsSchema = mongoose.Schema({
  performance: { type: String, require: true },
  genre: { type: String, require: true },
  price: { type: Number, require: true },
  day: { type: Number, require: true },
  image: { type: String, require: true },
});

mongoose.model('Concert', concertsSchema);
