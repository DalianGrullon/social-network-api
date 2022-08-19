const router = require('express').Router();

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

router.route('/:thoughtId')
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions')
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;

module.exports = router;