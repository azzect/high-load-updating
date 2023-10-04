const INTERNAL_MESSAGE = "Internal server error";

// eslint-disable-next-line no-unused-vars
const handleThrowingErrorToResponseMiddleware = (err, req, res, next) => {
  const status = err.status || err.statusCode;

  console.log({
    status,
    message: err.message,
    errors: err.errors,
  });

  console.error(err.stack);

  if (status) {
    res.status(status).json({
      status,
      message: err.message,
      errors: err.errors,
    });
  } else {
    res.status(500).json({
      status: 500,
      message: INTERNAL_MESSAGE,
    });
  }
};

module.exports = {
  handleThrowingErrorToResponseMiddleware,
};
