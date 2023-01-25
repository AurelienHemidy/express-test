exports.success = (message, data) => {
  return { message, data };
};

exports.error = (errorMessage, data) => {
  return { errorMessage, data };
};
