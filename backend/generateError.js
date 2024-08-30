module.exports = gerenateError = (err, code) => {
  const error = new Error(err);
  error.statusCode = code;

  return error;
};
