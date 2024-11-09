const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = 5000;

app.use(
  cors({
    origin: [
      "https://momin-hossain.vercel.app",
      "https://momin-hossain.netlify.app",
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
    const portCollection = client.db("Portfolio").collection("Users");
    const messageCollection = client.db("Portfolio").collection("Message");

    app.get(process.env.USERS, async (req, res) => {
      try {
        const result = await portCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    app.post(process.env.COUNT, async (req, res) => {
      const {
        name,
        deviceType,
        browser,
        userAgent,
        lastVisited,
        sessionId,
        screenResolution,
        windowSize,
      } = req.body;

      try {
        const result = await portCollection.updateOne(
          { name, sessionId }, // Track unique visits with sessionId
          {
            $inc: { count: 1 },
            $set: {
              lastVisited,
              deviceType,
              browser,
              userAgent,
              screenResolution,
              windowSize,
            },
          },
          { upsert: true }
        );
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    app.post("/api/message", async (req, res) => {
      try {
        const result = await messageCollection.insertOne(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to Portfolio Server");
});

app.listen(port, () => {
  console.log(`CRUD IS RUNNING ON PORT ${port}`);
});
