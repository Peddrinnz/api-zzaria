const paginationMiddleware = (req, res, next) => {
  let { limit, offset } = req.query;

  limit = Number(limit);
  offset = Number(offset);

  if (!limit || limit <= 0) limit = 10;
  if (!offset || offset < 0) offset = 0;
  if (limit > 100) limit = 100;

  req.pagination = {
    limit,
    offset
  };

  next();
};

module.exports = paginationMiddleware;
