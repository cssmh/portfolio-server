const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/Routes");
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
app.use(router);

// async function run() {
//   try {
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. Successfully connected to MongoDB!");
//   } finally {
//     // await client.close();
//   }
// }
// run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to Portfolio Server");
});

app.listen(port, () => {
  console.log(`CRUD IS RUNNING ON PORT ${port}`);
});
