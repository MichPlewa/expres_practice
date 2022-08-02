const express = require('express');
const router = express.Router();
const Control = require('../controllers/seats.controllers');

router.get('/seats', Control.getAll);

router.get('/seats/random', Control.getRandom);

router.get('/seats/:id', Control.getById);

router.post('/seats', Control.postOne);

router.put('/seats/:id', Control.editOne);

router.delete('/seats/:id', Control.deleteOne);

module.exports = router;
