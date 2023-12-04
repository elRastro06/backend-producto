import { ObjectId } from "mongodb";
import products from "./conn.mjs";
import express from "express";
import { getFiltros, getSortByDate } from "./help.mjs";
import { getClientById, getBidsByProductId } from "./api.mjs";

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/:id1/:id2", async (req, res) => {
    try {
      const results = await products.findOne({$or: [
        {userID: req.params.id1, soldID: req.params.id2}, 
        {userID: req.params.id2, soldID: req.params.id1}
      ]});
  
    res.send(results).status(200);
    } catch (e) {
      res.send(e).status(500);
    }
  });

export default app;
