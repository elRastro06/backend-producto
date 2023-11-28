import express from "express";
import v1 from "./v1.mjs";
<<<<<<< HEAD
import v2 from "./v2.mjs";
=======
import cors from "cors";
>>>>>>> 1c56ab0919db40d067e12c808f5f9a1d52ac49f5

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

app.use("/v1", v1);
app.use("/v2", v2);
