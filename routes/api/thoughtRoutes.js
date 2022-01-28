const router = require('express').Router();
const {
  getThoughts,
  addReaction,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  deleteReaction,
} = require('../../controllers/thoughtController.js');


router.route('/').get(getThoughts).post(createThought);


router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction)


module.exports = router;