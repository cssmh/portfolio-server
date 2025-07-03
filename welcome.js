const express = require("express");
const welcome = express.Router();

welcome.get("/", (req, res) => {
  const currentYear = new Date().getFullYear();

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Matrix API Server | Momin</title>
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@600&display=swap" rel="stylesheet">
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

    .container {
      position: relative;
      z-index: 2;
      height: 100vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card {
      background: rgba(0, 255, 159, 0.07);
      border: 1px solid rgba(0, 255, 159, 0.2);
      border-radius: 16px;
      backdrop-filter: blur(10px);
      box-shadow: 0 0 30px rgba(0,255,159,0.2);
      padding: 2rem 2.5rem;
      max-width: 600px;
      width: 92%;
      text-align: center;
      color: #e0ffee;
    }

    .typing-title {
      font-size: 1.4rem;
      white-space: nowrap;
      overflow: hidden;
      border-right: 2px solid #00ff9f;
      width: 0;
      margin-bottom: 1rem;
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

    .subtitle {
      font-size: 0.95rem;
      margin-bottom: 1.2rem;
      color: #a5ffe7;
    }

    .info {
      font-size: 0.88rem;
      color: #baffef;
      margin-bottom: 1.5rem;
    }

    .cta-button {
      padding: 10px 22px;
      background: #00ff9f;
      color: #000;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .cta-button:hover {
      transform: scale(1.04);
      box-shadow: 0 0 12px #00ff9f;
    }

    .time {
      margin-top: 1.2rem;
      font-size: 0.9rem;
      color: #a0ffe0;
    }

    .footer {
      margin-top: 1.2rem;
      font-size: 0.75rem;
      color: #00ffcc;
      font-weight: bold;
      letter-spacing: 1px;
    }

    @media (max-width: 480px) {
      .card { padding: 1.5rem 1.2rem; }
      .typing-title { font-size: 1.2rem; }
    }
  </style>
</head>
<body>
  <canvas id="matrix"></canvas>
  <div class="container">
    <div class="card">
      <div class="typing-title">> Welcome to Momin's API Server...</div>
      <div class="subtitle">Backend online. Express initialized. 🌐</div>
      <div class="info">You have reached the root of Momin’s <strong>Matrix Dev Portal</strong>.</div>
      <a class="cta-button" href="https://momin-hossain.vercel.app" target="_blank">Visit Portfolio 🚀</a>
      <div class="time" id="live-time">📅 Loading BD Time...</div>
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

    // Matrix Effect
    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters = "01";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

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

module.exports = welcome;
