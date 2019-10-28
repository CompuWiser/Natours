const router = require('express').Router();
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  getMyTours,
  updateUserData
} = require('../controllers/viewsController');
const auth = require('../controllers/authController');
const booking = require('../controllers/bookingController');

router.get('/', auth.isLoggedIn, getOverview);
router.get('/tour/:slug', auth.isLoggedIn, getTour);
router.get('/login', auth.isLoggedIn, getLoginForm);
router.get('/me', auth.protect, getAccount);

router.get('/my-tours', booking.createBookingCheckout, auth.protect, getMyTours);

router.post('/submit-user-data', auth.protect, updateUserData);

module.exports = router;
