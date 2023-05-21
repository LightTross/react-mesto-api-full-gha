const express = require('express');
const mongoose = require('mongoose');
//const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const cors = require('cors');

const { router } = require('./routes');

const { serverError } = require('./middlewares/serverError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// app.use(cors); // подключаем CORS
app.use(cors({
  credentials: true,
  origin: [
    'http://talalayeva.mesto.nomoredomains.monster',
    'https://talalayeva.mesto.nomoredomains.monster',
    'http://api.talalayeva.mesto.nomoredomains.monster',
    'https://api.talalayeva.mesto.nomoredomains.monster',
    'localhost:3000',
    'http://localhost:3000/',
    'https://localhost:3000/',
  ],
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(cookieParser());

//app.use(helmet());
//app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

router.use(errors());

app.use(serverError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
