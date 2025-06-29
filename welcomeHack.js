const express = require("express");
const welcomeHack = express.Router();

welcomeHack.get("/", (req, res) => {
  const currentYear = new Date().getFullYear();

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Matrix Dev Portal | Momin</title>
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: black;
      overflow: hidden;
      font-family: 'Share Tech Mono', monospace;
      color: #00ff9f;
    }

    canvas {
      position: fixed;
      top: 0; left: 0;
      z-index: 0;
    }

    .terminal {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .glass-box {
      background: rgba(0, 255, 159, 0.05);
      padding: 2rem 2.5rem;
      border-radius: 12px;
      border: 1px solid rgba(0, 255, 159, 0.3);
      box-shadow: 0 0 20px rgba(0,255,159,0.3);
      max-width: 600px;
      width: 90%;
      text-align: left;
    }

    .typing-title {
      font-size: 1.3rem;
      white-space: nowrap;
      overflow: hidden;
      border-right: 2px solid #00ff9f;
      width: 0;
      animation: typing 3s steps(40, end) forwards, blink 0.8s infinite;
    }

    @keyframes typing {
      from { width: 0; }
      to { width: 100%; }
    }

    @keyframes blink {
      0%, 100% { border-color: transparent; }
      50% { border-color: #00ff9f; }
    }

    .desc {
      margin-top: 1rem;
      font-size: 0.95rem;
      color: #a5ffe7;
    }

    .live {
      margin-top: 1.5rem;
      font-size: 0.9rem;
      color: #00ffa5;
    }

    .link {
      display: inline-block;
      margin-top: 1.4rem;
      padding: 8px 18px;
      background: #00ff9f;
      color: black;
      font-weight: bold;
      text-decoration: none;
      border-radius: 6px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .link:hover {
      transform: scale(1.04);
      box-shadow: 0 0 10px #00ff9f;
    }

    .footer {
      margin-top: 1rem;
      font-size: 0.8rem;
      color: #00ffb3;
    }
  </style>
</head>
<body>
<canvas id="matrix"></canvas>
<div class="terminal">
  <div class="glass-box">
    <div class="typing-title">> Welcome to Momin's API Server...</div>
    <div class="desc">Backend system online. Express server initialized. Environment: <strong>Production</strong></div>
    <div class="live" id="live-time">⏳ Loading BD Time...</div>
    <a href="https://momin-hossain.vercel.app" class="link" target="_blank">Visit Portfolio 🚀</a>
    <div class="footer">© ${currentYear} Momin Hossain</div>
  </div>
</div>

<script>
  // Live Time
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
    document.getElementById("live-time").textContent = "📅 " + now.toLocaleString("en-BD", options);
  }
  setInterval(updateTime, 1000);
  updateTime();

  // Matrix Rain Effect
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const letters = "01";
  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const drops = Array.from({ length: columns }).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff9f";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      const x = i * fontSize;
      ctx.fillText(text, x, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    });
  }

  setInterval(draw, 50);

  window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  });
</script>
</body>
</html>`);
});

module.exports = welcomeHack;