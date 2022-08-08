const Seat = require('../models/seats.model');

exports.getAll = async (req, res) => {
  try {
    console.log('here');
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const st = await Seat.findOne().skip(rand);
    if (!st) res.status(404).json({ message: 'Not found' });
    else res.json(st);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const st = await Seat.findById(req.params.id);
    if (!st) res.status(404).json({ message: 'Not found' });
    else res.json(st);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    if (await Seat.exists({ day, seat })) {
      res.json({ message: 'The slot is already taken' });
    } else {
      const newSeat = new Seat({
        day: day,
        seat: seat,
        client: client,
        email: email,
      });
      await newSeat.save();
      const allSeats = await Seat.find();
      req.io.emit('seatsUpdated', allSeats);
      res.json({ message: 'Ok' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.editOne = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const st = await Seat.findById(req.params.id);
    if (st) {
      await Seat.updateOne(
        { _id: req.params.id },
        {
          $set: {
            day: day,
            seat: seat,
            client: client,
            email: email,
          },
        }
      );
      res.json(await Seat.find());
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const st = await Seat.findById(req.params.id);
    if (st) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(await Seat.find());
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
