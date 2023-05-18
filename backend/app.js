const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');

const { router } = require('./routes');

const { serverError } = require('./middlewares/serverError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов
app.use(cors);

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
