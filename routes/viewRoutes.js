const router = require('express').Router();
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  getMyTours,
  updateUserData,
  alerts
} = require('../controllers/viewsController');
const auth = require('../controllers/authController');
const booking = require('../controllers/bookingController');

router.use(alerts);

router.get('/', auth.isLoggedIn, getOverview);
router.get('/tour/:slug', auth.isLoggedIn, getTour);
router.get('/login', auth.isLoggedIn, getLoginForm);
router.get('/me', auth.protect, getAccount);

router.get('/my-tours', auth.protect, getMyTours);

router.post('/submit-user-data', auth.protect, updateUserData);

module.exports = router;
