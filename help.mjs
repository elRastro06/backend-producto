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
  if (queries.user_id) {
    filtros = {
      ...filtros,
      user_id: queries.user_id,
    };
  }
  return filtros;
}

function getUsuario(user_id) {
  // hago petición al microservicio de usuarios para obtener el id del usuario por el nombre
}

export function getSortByDate(req) {
  const sortByDate = req.query.sortByDate;
  if (sortByDate) {
    if (sortByDate === "asc") return { date: 1 };
    if (sortByDate === "desc") return { date: -1 };
  }
  return {};
}
