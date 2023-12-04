import { ObjectId } from "mongodb";
import products from "./conn.mjs";
import express from "express";
import { getFiltros, getSortByDate } from "./help.mjs";
import { getClientById, getBidsByProductId } from "./api.mjs";

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  if(req.query.lat && req.query.long && req.query.radius){
    const clientPetition = await fetch(`http://localhost:5000/v1/?lat=${req.query.lat}&long=${req.query.long}&radius=${req.query.radius}`);
    const result_cliente = await clientPetition.json();
    // make a list with the ids of the clients in order to add them to the filter
    const clientIds = result_cliente.map((client) => client._id);
    let filtros = { userID: { $in: clientIds } };
    if (req.query.name) {
      filtros = {
        ...filtros,
        name: { $regex: req.query.name, $options: "i" },
      };
    }
    const result = await products.find(filtros).toArray();
    res.send(result).status(200);
  }
  else{
    const filtros = getFiltros(req.query);
    const sort = getSortByDate(req.query);
    const results = await products.find(filtros).sort(sort).toArray();
    res.send(results).status(200);
  }
});

app.get("/:id1/:id2", async (req, res) => {
    try {
      const results = await products.find({$or: [
        {userID: req.params.id1, soldID: req.params.id2}, 
        {userID: req.params.id2, soldID: req.params.id1}
      ]})
      .toArray();
  
    res.send(results).status(200);
    } catch (e) {
      res.send(e).status(500);
    }
  });

export default app;
