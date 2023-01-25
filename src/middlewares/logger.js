exports.logger = (req, res, next) => {
  const message = {
    method: req.method,
    url: req.url,
  };

  console.log(message);

  next();
};
