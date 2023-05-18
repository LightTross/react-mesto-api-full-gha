const allowedCors = [
  'http://talalayeva.mesto.nomoredomains.monster',
  'https://talalayeva.mesto.nomoredomains.monster',
  'http://api.talalayeva.mesto.nomoredomains.monster',
  'https://api.talalayeva.mesto.nomoredomains.monster',
  'localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const requestHeaders = req.headers['access-control-request-headers']; // сохраняем список заголовков исходного запроса
  const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE'; // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);

    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
};
