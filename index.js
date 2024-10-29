const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = 5000;

app.use(
  cors({
    origin: [
      "https://momin-hossain.netlify.app",
      "https://momin-hossain.surge.sh",
    ],
    credentials: true,
  })
);
app.use(express.json());

const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const portfolioCollection = client.db("gadXtreme").collection("portfolio");
    app.post("/api/count-portfolio", async (req, res) => {
      const { name } = req.body;
      try {
        const result = await portfolioCollection.updateOne(
          { name: name },
          {
            $inc: { count: 1 },
            $set: { date: new Date() },
          },
          { upsert: true }
        );
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    await client.db("admin").command({ ping: 1 });
  } 
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to Portfolio Server");
});

app.listen(port, () => {
  console.log(`CRUD IS RUNNING ON PORT ${port}`);
});
