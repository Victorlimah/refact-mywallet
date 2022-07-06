export default function errorHandler(err, _req, res, _next) {
  console.log("chegou no errorHandler");
  const exceptions = {
  "UnprocessableEntity": 422,
  "Unauthorized": 401,
  "NotFound": 404,
  "InternalServerError": 500
  }

  const status = exceptions[err.type] || 500;
  res.status(status).send({ message: err.message });
}