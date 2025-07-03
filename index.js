const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/Routes");
const welcomeRoute = require("./welcome");
require("dotenv").config();
const port = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://momin-hossain.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(router);
app.use(welcomeRoute);

app.listen(port, () => {
  console.log(`Portfolio is running on http://localhost:${port}`);
});
