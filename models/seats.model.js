const mongoose = require('mongoose');

const seatsSchema = mongoose.Schema({
  day: { type: Number, require: true },
  seat: { type: Number, require: true },
  client: { type: String, require: true },
  email: { type: String, require: true },
});

mongoose.model('Seat', seatsSchema);
