const ResponseHandler = (req, res, next) => {
  res.created = (model, data) => {
    return res.status(201).json({
      status: 201,
      data: data,
      message: `${model} created successfully`,
    });
  };

  res.updated = (model, data) => {
    return res.status(201).json({
      status: 201,
      data: data,
      message: `${model} updated successfully`,
    });
  };

  res.deleted = (model) => {
    return res.status(200).json({
      status: 200,
      message: `${model} deleted successfully`,
    });
  };

  res.fetched = (data) => {
    return res.status(200).json(data);
  };

  res.success = (message, data) => {
    const resObj = {
      status: 200,
      message,
    };
    if (data) {
      resObj.data = data;
    }
    return res.status(200).json(resObj);
  };

  res.error = (errorObj) => {
    return res.status(errorObj.statusCode).json(errorObj);
  };

  next();
};

export default ResponseHandler;
