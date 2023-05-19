const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { UnauthorizedError } = require('../errors/UnauthorizedError');

// module.exports = (req, res, next) => {
//   // извлекаем токен
//   const token = req.cookies.jwt;

//   let payload;

//   try {
//     // пытаемся верифицировать токен
//     payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'some-secret-key');
//   } catch (err) {
//     return next(new UnauthorizedError('Необходима авторизация'));
//   }
//   // записываем пейлоуд в объект запроса
//   req.user = payload;

//   // пропускаем запрос дальше
//   return next();
// };

const handleAuthError = (next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(next);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'secret-key');
  } catch (err) {
    return handleAuthError(next);
  }

  req.user = payload;
  return next();
};
