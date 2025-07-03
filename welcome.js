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
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&display=swap');
        body {
          min-height: 100vh;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #16161a;
          font-family: 'Quicksand', sans-serif;
          overflow: hidden;
        }
        /* Animated Gradient Circles */
        .bg-anim {
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0; left: 0;
          overflow: hidden;
          z-index: 0;
        }
        .circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.45;
          animation: move-circles 18s ease-in-out infinite alternate;
        }
        .circle1 {
          width: 360px; height: 360px;
          top: -80px; left: -60px;
          background: radial-gradient(circle at 60% 50%, #e42265 65%, #3a125c 100%);
          animation-delay: 0s;
        }
        .circle2 {
          width: 220px; height: 220px;
          top: 60vh; left: 68vw;
          background: radial-gradient(circle at 60% 30%, #4e54c8 60%, #22223b 100%);
          animation-delay: 6s;
        }
        .circle3 {
          width: 180px; height: 230px;
          top: 48vh; left: 18vw;
          background: radial-gradient(circle at 40% 60%, #00c3ff 60%, #16161a 100%);
          opacity: 0.28;
          animation-delay: 3s;
        }
        .circle4 {
          width: 120px; height: 120px;
          top: 10vh; left: 75vw;
          background: radial-gradient(circle at 50% 50%, #f7971e 60%, #ffd200 100%);
          opacity: 0.19;
          animation-delay: 9s;
        }
        .circle5 {
          width: 90px; height: 90px;
          top: 78vh; left: 12vw;
          background: radial-gradient(circle at 45% 40%, #e42265 70%, #ffb88c 100%);
          opacity: 0.26;
          animation-delay: 13s;
        }
        @keyframes move-circles {
          0%   { transform: scale(1) translateY(0);}
          100% { transform: scale(1.12) translateY(-60px);}
        }
        /* Glass Card */
        .mainbox {
          position: relative;
          z-index: 1;
          width: 390px;
          background: rgba(34, 33, 44, 0.82);
          backdrop-filter: blur(16px) saturate(1.22);
          border-radius: 28px;
          box-shadow: 0 8px 60px 0 rgba(59,18,70,0.27);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 2.1rem 1.6rem 1.8rem 1.6rem;
          text-align: center;
          transition: box-shadow 0.3s;
        }
        .mainbox:hover {
          box-shadow: 0 15px 55px 0 rgba(228,34,101,0.35);
        }
        .badge {
          display: inline-block;
          background: linear-gradient(90deg, #00c3ff 0%, #e42265 100%);
          color: #fff;
          padding: 0.28em 1.18em;
          border-radius: 21px;
          font-size: .95rem;
          font-weight: 700;
          margin-bottom: 0.85em;
          letter-spacing: 0.09em;
          box-shadow: 0 2px 8px rgba(230,34,69,0.18);
          border: 1.5px solid #ffffff22;
        }
        h1 {
          margin: 0 0 0.28em 0;
          font-size: 1.45rem;
          background: linear-gradient(90deg,#fff 15%,#e42245 68%,#00c3ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-shadow: 0 1px 8px rgba(255,255,255,0.08);
          text-transform: uppercase;
        }
        .subtitle {
          font-size: 1.11rem;
          color: #d6e3f7;
          margin-bottom: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.06em;
        }
        .wave {
          display: block;
          width: 50px;
          margin: 1.2em auto 1.3em auto;
        }
        .info {
          font-size: 1.01rem;
          color: #f4f4fa;
          margin-bottom: 1.1rem;
          line-height: 1.58em;
        }
        .cta-row {
          margin: 1.23em 0 .23em 0;
        }
        .cta-button {
          display: inline-block;
          padding: 12px 35px;
          border-radius: 11px;
          font-size: 1.05rem;
          font-weight: 800;
          text-decoration: none;
          letter-spacing: 0.08em;
          background: linear-gradient(90deg, #e42245 0%, #00c3ff 100%);
          color: #fff;
          transition: background 0.18s, transform 0.10s;
          box-shadow: 0 5px 16px rgba(34,34,34,0.10);
          border: none;
        }
        .cta-button:hover {
          background: linear-gradient(90deg, #00c3ff 0%, #e42245 100%);
          transform: scale(1.055) rotate(-1deg);
          color: #fff;
          box-shadow: 0 10px 32px rgba(34,34,34,0.13);
        }
        .today {
          margin-top: .9em;
          font-size: 1.01rem;
          color: #dbeafe;
          font-weight: 700;
          letter-spacing: .05em;
        }
        .footer {
          margin-top: 1.2em;
          font-size: .92rem;
          color: #e42245;
          letter-spacing: 0.13em;
          font-weight: 800;
          text-transform: uppercase;
        }
        /* Responsive */
        @media (max-width: 500px) {
          .mainbox { padding: .85rem .14rem; max-width: 99vw; }
          h1 { font-size: 1.18rem; }
        }
      </style>
    </head>
    <body>
      <div class="bg-anim">
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
        <div class="circle circle3"></div>
        <div class="circle circle4"></div>
        <div class="circle circle5"></div>
      </div>
      <div class="mainbox">
        <div class="badge">API ONLINE</div>
        <h1>Momin's Portfolio Server</h1>
        <div class="subtitle">Welcome to <b>Momin Hossain's API</b></div>
        <svg class="wave" viewBox="0 0 44 12" fill="none"><path d="M2 10C6 6 10 6 14 10C18 14 22 14 26 10C30 6 34 6 38 10" stroke="#e42245" stroke-width="2" stroke-linecap="round" fill="none"/></svg>
        <div class="info">
          The API is <b style="color:#fff;">running smoothly</b>.<br/>
          <span style="color:#fff;font-weight:700;">All systems operational.</span>
        </div>
        <div class="cta-row">
          <a href="https://momin-hossain.vercel.app" class="cta-button" target="_blank" rel="noopener">Visit Portfolio</a>
        </div>
        <div class="today" id="live-time">${initialTime}</div>
        <div class="footer">&copy; ${currentYear} MD Momin Hossain.</div>
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
