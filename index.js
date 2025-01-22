const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/Routes");
require("dotenv").config();
const port = process.env.PORT;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mominhossain.vercel.app",
      "https://momin-hossain.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  const currentTime = new Date().toLocaleString("en-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  res.send(`
    Momin's Portfolio Server is running smoothly<br>
    Today: ${currentTime}
  `);
});

app.listen(port, () => {
  console.log(`Portfolio is running on http://localhost:${port}`);
});
