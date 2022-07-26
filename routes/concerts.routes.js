const express = require('express');
const Control = require('../models/concerts.model');
const router = express.Router();

router.get('/concerts', Control.getAll);

router.get('/concerts/random', Control.getRandom);

router.get('/concerts/:id', Control.getById);

router.post('/concerts', Control.postOne);

router.put('/concerts', Control.editOne);

router.delete('/concerts', Control.deleteOne);

module.exports = router;
