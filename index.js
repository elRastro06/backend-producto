const express = require('express');
const app = express();
const port = 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://afr012240:mongo@clusteriw.9j6wq5e.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname}); 
});

app.get('/json', (req, res) => {
    res.json({
        "pepe": "jojojo",
        "anotherKey": "anotherValue",
        "moreData": {
            "nestedKey": "nestedValue",
            "arrayKey": [1, 2, 3]
        }
    });
});

app.get('/pepe', (req, res) => {
    res.send("pepe");
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});