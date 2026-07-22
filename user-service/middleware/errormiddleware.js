const errorHandling = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({ message: err.message || "Interna server error" });
};

module.exports = errorHandling;
