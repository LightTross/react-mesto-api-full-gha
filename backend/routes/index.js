const router = require('express').Router();

const { createUser, login } = require('../controllers/users');

const auth = require('../middlewares/auth');

const { NotFoundError } = require('../errors/errors');

const {
  signInValidation,
  signUpValidation,
} = require('../middlewares/validations');

router.post('/signup', signUpValidation, createUser);
router.post('/signin', signInValidation, login);

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = { router };
