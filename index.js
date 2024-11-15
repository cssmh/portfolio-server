const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/Routes");
require("dotenv").config();
const port = process.env.PORT;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://momin-hossain.vercel.app",
      "https://momin-hossain.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send("Welcome to Md. Momin Hossain Portfolio Server");
});

app.listen(port, () => {
  console.log(`CRUD IS RUNNING ON PORT ${port}`);
});
