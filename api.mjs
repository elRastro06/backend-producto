import axios from "axios";
const urlCliente = "http://localhost:5000/v1";

export const getClientById = async (id) => {
  const response = await axios.get(`${urlCliente}/${id}`);
  return response.data;
};
