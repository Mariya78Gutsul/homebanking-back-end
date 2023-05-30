const responseError = (error) => ({
  status: error.status,
  code: error.code,
  message: error.message,
  data: error.data,
});

module.exports = responseError;
