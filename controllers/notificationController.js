import TelegramBot from "node-telegram-bot-api";
import { UAParser } from "ua-parser-js";

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const recentVisitors = new Map();

async function sendNotification(req, res) {
  const { variant = "normal" } = req.query;

  const headings = {
    normal: "🚨 NEW VISIT",
    google: "🚨 GOOGLE LOGIN ATTEMPT",
  };

  const heading = headings[variant] ?? headings.normal;

  try {
    // 1. Get the visitor's IP
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
      req.socket.remoteAddress;

    const userAgent = req.headers["user-agent"] || "Unknown";
    const parser = new UAParser(userAgent);
    const device = parser.getDevice();
    const browser = parser.getBrowser();

    const deviceType =
      device.type === "mobile"
        ? "Mobile"
        : device.type === "tablet"
          ? "Tablet"
          : "Desktop";

    const browserName = browser.name?.replace(" Mobile", "") || "Unknown";

    const now = new Date();
    const lastVisit = recentVisitors.get(ip);
    const time = now.toLocaleTimeString("en-US");
    const date = now.toLocaleDateString("en-US");
    const lookupUrl = `http://www.geoiptool.com/?IP=${ip}`;

    let location = "Unavailable";
    let isp = "Unavailable";

    if (lastVisit && now - lastVisit < 60 * 1000) {
      return res.json({
        message: "Visitor already notified recently",
      });
    }

    recentVisitors.set(ip, Date.now());

    if (ip !== "::1" && ip !== "127.0.0.1") {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);

      if (response.ok) {
        const geoData = await response.json();

        location =
          [geoData.city, geoData.region, geoData.country_name]
            .filter(Boolean)
            .join(", ") || "Unavailable";

        isp = geoData.org || "Unavailable";
      }
    }

    const message = `
    ${heading}
    
🌐 IP: ${ip}
🔗 Lookup: ${lookupUrl}

📍 Location: ${location}
🏢 ISP: ${isp}

⏰ Time: ${time} ${date}
💻 Device: ${deviceType} / ${browserName}
`;

    await bot.sendMessage(CHAT_ID, message);

    res.json({
      message: "Visitor notification sent",
    });
  } catch (error) {
    console.error("Notification error:", error);

    res.status(500).json({
      message: "Failed to send visitor notification",
    });
  }
}

export { sendNotification };
