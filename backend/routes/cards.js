const router = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  createCardValidation,
  cardIdValidation,
} = require('../middlewares/validations');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:id', cardIdValidation, deleteCard); // :cardId
router.put('/:id/likes', cardIdValidation, likeCard);
router.delete('/:id/likes', cardIdValidation, dislikeCard);

module.exports = router;
