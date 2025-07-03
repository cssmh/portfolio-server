const express = require("express");
const welcomeRoute = express.Router();

welcomeRoute.get("/", (req, res) => {
  const initialTime = new Date().toLocaleString("en-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const currentYear = new Date().getFullYear();

  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Momin's Portfolio Server</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', sans-serif;
      background: #0e0e2c;
      color: white;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      position: relative;
    }

    .blob {
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle at 30% 30%, #ff2d75, transparent);
      border-radius: 50%;
      filter: blur(120px);
      animation: float 20s infinite ease-in-out alternate;
      opacity: 0.6;
    }

    .blob:nth-child(2) {
      top: 20%;
      left: 60%;
      background: radial-gradient(circle at 30% 30%, #4e54c8, transparent);
      animation-delay: 10s;
    }

    @keyframes float {
      0% { transform: translateY(0) scale(1); }
      100% { transform: translateY(-80px) scale(1.1); }
    }

    .card {
      position: relative;
      z-index: 1;
      padding: 2.2rem 2rem;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(14px);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 60px rgba(255, 45, 117, 0.15);
      max-width: 360px;
      text-align: center;
    }

    .badge {
      background: #ff2d75;
      padding: 4px 18px;
      border-radius: 30px;
      font-size: 0.8rem;
      font-weight: 700;
      display: inline-block;
      margin-bottom: 1rem;
    }

    h1 {
      font-size: 1.6rem;
      font-weight: 700;
      background: linear-gradient(to right, #ffffff, #ff2d75, #4e54c8);
      -webkit-background-clip: text;
      color: transparent;
      margin-bottom: 0.6rem;
    }

    .subtitle {
      font-size: 1rem;
      color: #e0e0e0;
      margin-bottom: 1.3rem;
      line-height: 1.5;
    }

    .info {
      font-size: 0.92rem;
      margin-bottom: 1.3rem;
      color: #dcdcdc;
    }

    .cta-button {
      padding: 10px 24px;
      background: linear-gradient(to right, #ff2d75, #b3124a);
      color: #fff;
      font-weight: bold;
      border-radius: 8px;
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(255, 45, 117, 0.3);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .cta-button:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 28px rgba(255, 45, 117, 0.4);
    }

    .time {
      margin-top: 1.2rem;
      font-size: 0.87rem;
      color: #f2f2f2;
    }

    .footer {
      margin-top: 1rem;
      font-size: 0.8rem;
      color: #ff2d75;
      letter-spacing: 1px;
      font-weight: bold;
    }

    @media(max-width: 480px) {
      .card {
        padding: 1.6rem 1.3rem;
        max-width: 90vw;
      }
    }
  </style>
</head>
<body>
  <div class="blob" style="top: 10%; left: 15%;"></div>
  <div class="blob"></div>

  <div class="card">
    <div class="badge">🟢 ONLINE</div>
    <h1>Momin's Portfolio Server</h1>
    <div class="subtitle">
      Welcome to <strong>Momin Hossain's</strong><br />Node.js Express API
    </div>
    <div class="info">
      All systems are running smoothly.<br />
      You have reached the API welcome page.
    </div>
    <a href="https://momin-hossain.vercel.app" class="cta-button" target="_blank">Visit Portfolio</a>
    <div class="time" id="live-time">${initialTime}</div>
    <div class="footer">&copy; ${currentYear} Momin Hossain</div>
  </div>

  <script>
    function updateTime() {
      const options = {
        timeZone: "Asia/Dhaka",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const now = new Date();
      document.getElementById("live-time").textContent = now.toLocaleString("en-BD", options);
    }
    setInterval(updateTime, 1000);
    updateTime();
  </script>
</body>
</html>
  `);
});

module.exports = welcomeRoute;
