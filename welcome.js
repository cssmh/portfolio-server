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
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&display=swap');
        body {
          min-height: 100vh;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(120deg, #232526 0%, #e42265 100%);
          font-family: 'Quicksand', sans-serif;
          overflow: hidden;
        }
        .background-svg {
          position: fixed;
          top: 0; left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
        }
        .hexagon {
          animation: floatHex 12s ease-in-out infinite alternate;
          opacity: 0.23;
        }
        .hexagon:nth-child(2) { animation-delay: 2s; opacity: 0.18; }
        .hexagon:nth-child(3) { animation-delay: 4s; opacity: 0.13; }
        .hexagon:nth-child(4) { animation-delay: 6s; opacity: 0.25; }
        .hexagon:nth-child(5) { animation-delay: 8s; opacity: 0.21; }
        .hexagon:nth-child(6) { animation-delay: 10s; opacity: 0.12; }
        @keyframes floatHex {
          0%   { transform: translateY(0) scale(1) rotate(0deg);}
          100% { transform: translateY(-90px) scale(1.12) rotate(7deg);}
        }
        .mainbox {
          position: relative;
          z-index: 1;
          width: 330px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(11px);
          border-radius: 22px;
          box-shadow: 0 6px 40px rgba(36,19,52,0.23);
          border: 1px solid rgba(255,255,255,0.14);
          padding: 1.2rem 1.05rem 1.25rem 1.05rem;
          text-align: center;
          transition: box-shadow 0.3s;
        }
        .mainbox:hover {
          box-shadow: 0 9px 60px 0 rgba(228,34,101,0.27);
        }
        .badge {
          display: inline-block;
          background: linear-gradient(90deg, #f857a6 0%, #ff5858 100%);
          color: #fff;
          padding: 0.2em 0.85em;
          border-radius: 18px;
          font-size: .83rem;
          font-weight: 700;
          margin-bottom: 0.55em;
          letter-spacing: 0.06em;
          box-shadow: 0 2px 7px rgba(230,34,69,0.13);
        }
        h1 {
          margin: 0 0 0.18em 0;
          font-size: 1.23rem;
          background: linear-gradient(90deg,#fff 15%,#e62245 68%,#4e54c8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-shadow: 0 1px 8px rgba(255,255,255,0.12);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .subtitle {
          font-size: .94rem;
          color: #f8e8f6;
          margin-bottom: .7rem;
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .wave {
          display: block;
          width: 40px;
          margin: 0.8em auto 1.15em auto;
        }
        .info {
          font-size: .88rem;
          color: #e3e6f3;
          margin-bottom: .7rem;
          line-height: 1.5em;
        }
        .cta-row {
          margin: .8em 0 .18em 0;
        }
        .cta-button {
          display: inline-block;
          padding: 7px 20px;
          border-radius: 7px;
          font-size: .98rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.06em;
          background: linear-gradient(90deg, #e62245 0%, #b3123a 100%);
          color: #fff;
          transition: background 0.19s, transform 0.12s;
          box-shadow: 0 4px 15px rgba(230,34,69,0.09);
          border: none;
        }
        .cta-button:hover {
          background: linear-gradient(90deg, #b3123a 0%, #e62245 100%);
          transform: scale(1.04) rotate(-1deg);
          color: #fff;
          box-shadow: 0 9px 30px rgba(230,34,69,0.17);
        }
        .today {
          margin-top: .5em;
          font-size: .92rem;
          color: #f3f3fa;
          font-weight: 600;
          letter-spacing: .04em;
        }
        .footer {
          margin-top: .85em;
          font-size: .82rem;
          color: #e62245;
          letter-spacing: 0.09em;
          font-weight: 700;
          text-transform: uppercase;
        }
        /* Responsive */
        @media (max-width: 500px) {
          .mainbox { padding: .7rem .15rem; max-width: 99vw; }
          h1 { font-size: 1.09rem; }
        }
      </style>
    </head>
    <body>
      <svg class="background-svg" width="100vw" height="100vh">
        <polygon class="hexagon" points="80,20 100,40 100,70 80,90 60,70 60,40" fill="#fff" style="top:15vh;left:8vw;position:absolute;width:70px;height:70px;" />
        <polygon class="hexagon" points="270,60 290,80 290,110 270,130 250,110 250,80" fill="#e62245" style="top:60vh;left:19vw;position:absolute;width:60px;height:60px;" />
        <polygon class="hexagon" points="520,180 540,200 540,230 520,250 500,230 500,200" fill="#fff" style="top:35vh;left:75vw;position:absolute;width:55px;height:55px;" />
        <polygon class="hexagon" points="390,110 410,130 410,160 390,180 370,160 370,130" fill="#b3123a" style="top:80vh;left:67vw;position:absolute;width:40px;height:40px;" />
        <polygon class="hexagon" points="690,280 710,300 710,330 690,350 670,330 670,300" fill="#ffb88c" style="top:18vh;left:55vw;position:absolute;width:32px;height:32px;" />
        <polygon class="hexagon" points="60,200 80,220 80,250 60,270 40,250 40,220" fill="#e62245" style="top:75vh;left:10vw;position:absolute;width:38px;height:38px;" />
      </svg>
      <div class="mainbox">
        <div class="badge">ONLINE</div>
        <h1>Momin's Portfolio Server</h1>
        <div class="subtitle">Hello! You're at the home of<br><b>Momin Hossain's API</b></div>
        <svg class="wave" viewBox="0 0 44 12" fill="none"><path d="M2 10C6 6 10 6 14 10C18 14 22 14 26 10C30 6 34 6 38 10" stroke="#e62245" stroke-width="2" stroke-linecap="round" fill="none"/></svg>
        <div class="info">
          The API is running smoothly.<br>
          <span style="color:#fff;font-weight:600;">Welcome!</span>
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
