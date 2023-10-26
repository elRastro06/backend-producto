import { MongoClient } from "mongodb";
const connectionString =
  "mongodb+srv://valentingr080:webweb1@cluster0.wzoljba.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}
let db = conn.db("web");
let products = db.collection("products");
export default products;
