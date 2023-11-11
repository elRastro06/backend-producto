import { ObjectId } from "mongodb";
import products from "./conn.mjs";
import express from "express";
import { getFiltros, getSortByDate } from "./help.mjs";
import { getClientById, getBidsByProductId } from "./api.mjs";

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const filtro = getFiltros(req);
    const sortOption = getSortByDate(req);

    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 0;

    let results = await products
      .find(filtro)
      .sort(sortOption)
      .skip(offset)
      .limit(limit)
      .toArray();
    res.send(results).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});

app.post("/", async (req, res) => {
  try {
    const product = req.body;
    const result = await products.insertOne({ ...product, date: new Date() });
    res.send(result).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const result = await products.findOne({ _id: new ObjectId(req.params.id) });
    res.send(result).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const result = await products.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.send(result).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const result = await products.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.send(result).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});

app.get("/:id/cliente", async (req, res) => {
  try {
    const result = await products.findOne({ _id: new ObjectId(req.params.id) });
    const cliente = await getClientById(result.userID);
    res.send(cliente).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});

app.get("/:id/pujas", async (req, res) => {
  try {
    const pujas = await getBidsByProductId(req.params.id);
    res.send(pujas).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});

export default app;
