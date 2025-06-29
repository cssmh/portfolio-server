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
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <title>Momin's Portfolio Server</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
        body {
          background: linear-gradient(135deg, #181824 0%, #8d153a 100%);
          font-family: 'Montserrat',sans-serif;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f8f8fa;
        }
        .circles {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none;
        }
        .circles li {
          position: absolute; display: block; list-style: none;
          width: 12px; height: 12px;
          background: rgba(255,255,255,0.07);
          animation: animate 18s linear infinite;
          bottom: -100px; border-radius: 50%;
        }
        .circles li:nth-child(1) { left: 20%; width: 32px; height: 32px; animation-delay: 0s; }
        .circles li:nth-child(2) { left: 12%; width: 12px; height: 12px; animation-delay: 2s; animation-duration: 9s;}
        .circles li:nth-child(3) { left: 70%; width: 14px; height: 14px; animation-delay: 3s;}
        .circles li:nth-child(4) { left: 42%; width: 22px; height: 22px; animation-delay: 0s; animation-duration: 13s;}
        .circles li:nth-child(5) { left: 65%; width: 10px; height: 10px; animation-delay: 1s;}
        .circles li:nth-child(6) { left: 75%; width: 40px; height: 40px; animation-delay: 2s;}
        .circles li:nth-child(7) { left: 35%; width: 54px; height: 54px; animation-delay: 5s;}
        .circles li:nth-child(8) { left: 50%; width: 15px; height: 15px; animation-delay: 10s; animation-duration: 25s;}
        .circles li:nth-child(9) { left: 15%; width: 9px; height: 9px; animation-delay: 1s; animation-duration: 19s;}
        .circles li:nth-child(10) { left: 82%; width: 44px; height: 44px; animation-delay: 0s; animation-duration: 8s;}
        @keyframes animate {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-700px) rotate(360deg); opacity: 0; }
        }
        .container {
          text-align: center;
          position: relative;
          z-index: 1;
          padding: 1.3rem 1.2rem 1.2rem 1.2rem;
          background: rgba(255,255,255,0.09);
          backdrop-filter: blur(7px);
          border-radius: 16px;
          box-shadow: 0 10px 28px rgba(24,24,36,0.12);
          border: 1px solid rgba(255,255,255,0.13);
          max-width: 340px;
          width: 100%;
          margin: 0 auto;
        }
        .status {
          display: inline-block;
          margin-bottom: .7rem;
          padding: .19rem .9rem;
          background: linear-gradient(90deg,#e62245 0%,#b3123a 100%);
          color: #fff;
          border-radius: 30px;
          font-weight: 600;
          letter-spacing: 0.07em;
          font-size: .85rem;
          box-shadow: 0 2px 7px rgba(230,34,69,0.09);
        }
        h1 {
          font-size: 1.13rem;
          margin-bottom: .32rem;
          background: linear-gradient(90deg,#00dbde 0%,#fc00ff 33%,#e62245 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .subtitle {
          font-size: .9rem;
          color: #e9e9ef;
          margin-bottom: .8rem;
          font-weight: 400;
        }
        .divider {
          width: 31px; height: 2.2px;
          border-radius: 1px;
          background: linear-gradient(90deg, #e62245, #fff);
          margin: 0 auto 0.7rem auto;
          animation: slide 1.4s infinite alternate cubic-bezier(.5, .2, .2, 1);
        }
        @keyframes slide { from { width: 17px; } to { width: 31px; } }
        .info {
          font-size: .89rem;
          color: #c2c4e1;
          margin-bottom: .75rem;
        }
        .cta-row {
          display: flex;
          flex-direction: column;
          gap: .5rem;
          align-items: center;
          margin: .7rem 0 0.2rem 0;
        }
        .cta-button {
          display: inline-block;
          padding: 8px 20px;
          border-radius: 6px;
          font-size: .97rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.04em;
          box-shadow: 0 3px 10px rgba(230,34,69,0.11);
          transition: background 0.16s, transform 0.12s;
          background: linear-gradient(90deg, #e62245 0%, #b3123a 100%);
          color: #fff;
        }
        .cta-button:hover {
          background: linear-gradient(90deg, #b3123a 0%, #e62245 100%);
          transform: scale(1.025);
          color: #fff;
          box-shadow: 0 6px 13px rgba(230,34,69,0.09);
        }
        .footer {
          margin-top: 1.1rem;
          font-size: .85rem;
          color: #e62245;
          letter-spacing: 0.08em;
          font-weight: 700;
          text-transform: uppercase;
        }
        .today {
          margin-top: .6rem;
          font-size: .93rem;
          background: rgba(0,0,0,0.07);
          color: #fff;
          font-weight: 600;
          border-radius: 7px;
          padding: 5px 0;
          letter-spacing: .04em;
        }
        @media (max-width: 450px) {
          .container { padding: .7rem .25rem; }
          h1 { font-size: .99rem; }
        }
      </style>
    </head>
    <body>
      <ul class="circles">
        <li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li>
      </ul>
      <div class="container">
        <div class="status">SERVER RUNNING</div>
        <h1>Momin's Portfolio Server</h1>
        <div class="subtitle">Welcome to the <b>Backend API</b> of <b>Momin Hossain</b></div>
        <div class="divider"></div>
        <div class="info">
          Portfolio API is healthy &amp; live.<br>
        </div>
        <div class="cta-row">
          <a href="https://momin-hossain.vercel.app" class="cta-button" target="_blank" rel="noopener">Visit Portfolio</a>
        </div>
        <div class="today" id="live-time">${initialTime}</div>
        <div class="footer">&copy; ${currentYear} Momin Hossain. All rights reserved.</div>
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
