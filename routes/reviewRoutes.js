const router = require('express').Router({ mergeParams: true });
const auth = require('./../controllers/authController');
const {
  getAllReviews,
  getReview,
  setTourUserIds,
  createReview,
  updateReview,
  deleteReview
} = require('./../controllers/reviewController');

router.use(auth.protect);

router
  .route('/')
  .get(getAllReviews)
  .post(auth.restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(auth.restrictTo('user', 'admin'), updateReview)
  .delete(auth.restrictTo('user', 'admin'), deleteReview);

module.exports = router;
