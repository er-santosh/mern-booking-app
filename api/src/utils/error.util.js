const errorInterceptor = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const error = {
    success: false,
    statusCode: statusCode,
    message: message,
    stack: err.stack,
  };

  if (err.code === 11000) {
    return res.error({
      ...error,
      statusCode: 400,
      message: "Duplicate key detected",
    });
  }

  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.error({
      ...error,
      statusCode: 400,
      message: `Invalid mongo id (${err.value})`,
    });
  }

  return res.error(error);
};

export default errorInterceptor;
