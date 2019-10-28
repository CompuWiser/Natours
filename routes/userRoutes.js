const router = require('express').Router();
const {
  getMe,
  getUser,
  getAllUsers,
  updateMe,
  updateUser,
  deleteMe,
  deleteUser,
  createUser,
  uploadUserPhoto,
  resizeUserPhoto
} = require('./../controllers/userController');
const auth = require('./../controllers/authController');

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

router.post('/forgotPassword', auth.forgotPassword);
router.patch('/resetPassword/:token', auth.resetPassword);

// Protect all routes after this middleware
router.use(auth.protect);

router.patch('/updateMyPassword', auth.updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

router.use(auth.restrictTo('admin'));

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
