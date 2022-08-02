const express = require('express');
const router = express.Router();
const Control = require('../controllers/testimonials.controllers');

router.get('/testimonials', Control.getAll);

router.get('/testimonials/random', Control.getRandom);

router.get('testimonnials/:id', Control.getById);

router.post('testimonials', Control.postOne);

router.put('testimonials/:id', Control.editOne);

router.delete('testimonials/:id', Control.deleteOne);

module.exports = router;
