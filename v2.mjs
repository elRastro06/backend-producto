import { ObjectId } from "mongodb";
import products from "./conn.mjs";
import express from "express";
import { getFiltros, getSortByDate } from "./help.mjs";
import { getClientById, getBidsByProductId } from "./api.mjs";
import axios from "axios";

const app = express.Router();

const cloudinary = process.env.CLOUDINARY_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const filtros = await getFiltros(req);
  const sort = getSortByDate(req);
  const results = await products.find(filtros).sort(sort).toArray();
  res.send(results).status(200);
});

app.get("/:id1/:id2", async (req, res) => {
  try {
    const results = await products.findOne({
      $or: [
        { userID: req.params.id1, soldID: req.params.id2 },
        { userID: req.params.id2, soldID: req.params.id1 },
      ],
    });

    res.send(results).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const result = await products.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    //delete the photos
    await axios.delete(`${cloudinary}/v2/folder`, {
      data: { productId: req.params.id },
    });
    res.send(result).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});

export default app;
