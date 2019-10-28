const router = require('express').Router();
const {
  aliasTopTours,
  getAllTours,
  getTour,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
  createTour,
  updateTour,
  deleteTour,
  uploadTourImages,
  resizeTourImages
} = require('./../controllers/tourController');
const auth = require('./../controllers/authController');
const reviewRouter = require('./reviewRoutes');

//router.param('id', tourController.checkID);

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);

router
  .route('/monthly-plan/:year')
  .get(auth.protect, auth.restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(getToursWithin);

// using query params
// /tours-within?distance=233&center=-40,45&unit=mi

// /tours-within/233/center/-40,45/unit/mi

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(auth.protect, auth.restrictTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(
    auth.protect,
    auth.restrictTo('admin', 'lead-guide'),
    resizeTourImages,
    updateTour,
    updateTour
  )
  .delete(auth.protect, auth.restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
