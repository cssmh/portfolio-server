const client = require("../config/db");
const portCollection = client.db("Portfolio").collection("visitors");
const messageCollection = client.db("Portfolio").collection("message");
const fetch = global.fetch || require("node-fetch"); // Node 18+ has fetch; fallback to node-fetch if needed

const postMessage = async (req, res) => {
  try {
    const result = await messageCollection.insertOne(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Failed to save message" });
  }
};

const getMessages = async (req, res) => {
  try {
    const result = await messageCollection.find().sort({ _id: -1 }).toArray();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Failed to fetch messages" });
  }
};

const getVisitors = async (req, res) => {
  try {
    // support optional query params to exclude owner or a sessionId
    const { excludeSessionId, excludeOwner } = req.query;
    const filter = {};

    if (excludeSessionId) {
      filter.sessionId = { $ne: excludeSessionId };
    }
    if (excludeOwner === "true") {
      filter.isOwner = { $ne: true };
    }

    const result = await portCollection
      .find(filter)
      .sort({ _id: -1 })
      .toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to fetch visitors" });
  }
};

const postVisitor = async (req, res) => {
  const body = req.body || {};

  const {
    name,
    deviceType,
    browser,
    browserVersion,
    sessionId,
    lastVisited,
    screenResolution,
    os,
    osVersion,
    deviceModel,
    deviceVendor,
    deviceMemory,
    hardwareConcurrency,
    cpu,
    engine,
    userAgent,
    platform,
    languages,
    language,
    connection,
    touchSupport,
    cookieEnabled,
    colorDepth,
    viewportResolution,
    referrer,
    timezone,
    ipFromClient,
    isOwner,
    routeName,
    linkType,
  } = body;

  if (
    !name ||
    !deviceType ||
    !browser ||
    !sessionId ||
    !lastVisited ||
    !screenResolution
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields in the request body.",
    });
  }

  try {
    // Determine actual request IP (behind proxies via X-Forwarded-For if present)
    const forwarded = req.headers["x-forwarded-for"];
    let ip = null;
    if (forwarded) {
      // x-forwarded-for could be "client, proxy1, proxy2"
      ip = Array.isArray(forwarded)
        ? forwarded[0]
        : forwarded.split(",")[0].trim();
    } else if (req.ip) {
      ip = req.ip;
    } else if (req.socket && req.socket.remoteAddress) {
      ip = req.socket.remoteAddress;
    }

    // attempt to enrich ip with geolocation (use ipapi.co)
    let geo = null;
    try {
      const lookupIp = ip || ipFromClient || "";
      if (lookupIp) {
        // ipapi.co endpoint
        const geoResp = await fetch(`https://ipapi.co/${lookupIp}/json/`);
        if (geoResp && geoResp.ok) {
          geo = await geoResp.json();
        }
      }
    } catch (err) {
      console.warn("Geo lookup failed:", err);
      geo = null;
    }

    // Upsert the visitor. Use sessionId as a primary key to identify a device/session reliably
    const filter = { sessionId };
    const updateDoc = {
      $inc: { count: 1 },
      $set: {
        name,
        deviceType,
        browser,
        browserVersion,
        lastVisited,
        screenResolution,
        os,
        osVersion,
        deviceModel,
        deviceVendor,
        deviceMemory,
        hardwareConcurrency,
        cpu,
        engine,
        userAgent,
        platform,
        languages,
        language,
        connection,
        touchSupport,
        cookieEnabled,
        colorDepth,
        viewportResolution,
        referrer,
        timezone,
        ip: ip || ipFromClient || null,
        ipFromClient: !!ipFromClient,
        geo,
        isOwner: !!isOwner,
        routeName,
        linkType,
        updatedAt: new Date(),
      },
    };

    const result = await portCollection.updateOne(filter, updateDoc, {
      upsert: true,
    });

    res.status(200).json({
      success: true,
      message: "Visitor data processed successfully.",
      data: result,
    });
  } catch (err) {
    console.error("Error in postVisitor:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Delete records by sessionId (useful to remove owner device entries)
const deleteVisitorBySession = async (req, res) => {
  const { sessionId } = req.params;
  if (!sessionId) {
    return res
      .status(400)
      .json({ success: false, message: "sessionId required" });
  }
  try {
    const result = await portCollection.deleteMany({ sessionId });
    return res
      .status(200)
      .json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error("Error deleting visitor:", err);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

module.exports = {
  postMessage,
  getMessages,
  getVisitors,
  postVisitor,
  deleteVisitorBySession,
};
