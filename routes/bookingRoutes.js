const router = require('express').Router();
const {
  getCheckoutSession,
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking
} = require('./../controllers/bookingController');
const auth = require('./../controllers/authController');

router.use(auth.protect);

router.get('/checkout-session/:tourId', getCheckoutSession);

router.use(auth.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(getAllBookings)
  .post(createBooking);

router
  .route('/:id')
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

module.exports = router;
