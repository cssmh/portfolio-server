const express = require("express");
const cors = require("cors");
const favicon = require("serve-favicon");
const path = require("path");
const app = express();
const router = require("./routes/Routes");
const welcomeRoute = require("./welcome");
require("dotenv").config();
const port = process.env.PORT;

// Serve favicon
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

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
