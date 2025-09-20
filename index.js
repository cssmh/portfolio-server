const express = require("express");
const cors = require("cors");
const app = express();
const welcome = require("./welcome");
const portRoutes = require("./routes/Routes");
require("dotenv").config();
const port = process.env.PORT;

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
app.use(portRoutes);
app.use(welcome);

app.listen(port, () => {
  console.log(
    `🚀 Portfolio is running at: \x1b[36mhttp://localhost:${port}\x1b[0m`
  );
});