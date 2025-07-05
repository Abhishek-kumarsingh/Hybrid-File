const express = require('express');
const {
  getFeedback,
  getSingleFeedback
} = require('../controllers/feedback.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Protect all routes
router.use(protect);

router.route('/')
  .get(getFeedback);

router.route('/:id')
  .get(getSingleFeedback);

module.exports = router;