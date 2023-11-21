export function getFiltros(req) {
  let filtros = {};
  const queries = req.query;
  if (queries.description) {
    filtros = {
      ...filtros,
      description: { $regex: queries.description, $options: "i" },
    };
  }
  if (queries.name) {
    filtros = {
      ...filtros,
      name: { $regex: queries.name, $options: "i" },
    };
  }
  if (queries.price) {
    filtros = {
      ...filtros,
      price: parseFloat(queries.price),
    };
  }
  if (queries.userID) {
    filtros = {
      ...filtros,
      userID: queries.userID,
    };
  }
  return filtros;
}

export function getSortByDate(req) {
  const sortByDate = req.query.sortByDate;
  if (sortByDate) {
    if (sortByDate === "asc") return { date: 1 };
    if (sortByDate === "desc") return { date: -1 };
  }
  return {};
}
