const client = require("../config/db");
const portCollection = client.db("Portfolio").collection("visitors");

(async function ensureIndexes() {
  try {
    await portCollection.createIndex({ updatedAt: -1 });
    await portCollection.createIndex({
      sessionId: 1,
      name: 1,
      deviceType: 1,
      browser: 1,
    });
    console.log("Indexes ensured for visitors collection");
  } catch (err) {
    console.error("Error ensuring indexes:", err);
  }
})();

const getVisitors = async (req, res) => {
  try {
    const { excludeSessionId, excludeOwner, limit, page } = req.query;
    const filter = {};

    if (excludeSessionId) {
      filter.sessionId = { $ne: excludeSessionId };
    }
    if (excludeOwner === "true") {
      filter.isOwner = { $ne: true };
    }

    const pageNum = Math.max(1, parseInt(page || "1", 10));
    const perPage = Math.max(0, parseInt(limit || "0", 10));

    let cursor = portCollection.find(filter).sort({ updatedAt: -1, _id: -1 });

    if (perPage > 0) {
      cursor = cursor.skip((pageNum - 1) * perPage).limit(perPage);
    }

    const result = await cursor.toArray();
    res.send(result);
  } catch (error) {
    console.error("getVisitors error:", error);
    res.status(500).send({ error: "Failed to fetch visitors" });
  }
};

const addVisitor = async (req, res) => {
  try {
    const body = req.body || {};

    const {
      name,
      deviceType,
      browser,
      browserVersion,
      sessionId,
      lastVisitedISO,
      screenResolution,
      os,
      osVersion,
      deviceModel,
      deviceVendor,
      cpuArchitecture,
      engine,
      engineVersion,
      ipAddress,
      timezone,
      language,
      userAgent,
      isTouchScreen,
      isMobile,
      isTablet,
      isDesktop,
      colorDepth,
      pixelRatio,
      isOwner,
      geo, // optional: { latitude, longitude, accuracy }
    } = body;

    // Required fields
    if (!name || !deviceType || !browser || !sessionId || !screenResolution) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields in the request body.",
      });
    }

    const now = new Date();
    const lastVisitedDate = lastVisitedISO ? new Date(lastVisitedISO) : now;

    const filter = {
      name,
      sessionId,
      deviceType,
      browser,
    };

    const update = {
      $inc: { count: 1 },
      $set: {
        lastVisitedISO: lastVisitedDate,
        lastVisitedPretty:
          typeof lastVisitedISO === "string"
            ? new Date(lastVisitedISO).toLocaleString("en-GB", {
                timeZone: timezone || "UTC",
                hour12: true,
              })
            : new Date(lastVisitedDate).toLocaleString("en-GB", {
                timeZone: timezone || "UTC",
                hour12: true,
              }),
        updatedAt: now,
        screenResolution,
        browserVersion,
        os,
        osVersion,
        deviceModel,
        deviceVendor,
        cpuArchitecture,
        engine,
        engineVersion,
        ipAddress,
        timezone,
        language,
        userAgent,
        isTouchScreen: !!isTouchScreen,
        isMobile: !!isMobile,
        isTablet: !!isTablet,
        isDesktop: !!isDesktop,
        colorDepth,
        pixelRatio,
        sessionId,
        isOwner: !!isOwner,
        geo: geo || null,
      },
      $setOnInsert: {
        createdAt: now,
      },
    };

    const options = { upsert: true, returnDocument: "after" };

    const result = await portCollection.findOneAndUpdate(
      filter,
      update,
      options
    );

    res.status(200).json({
      success: true,
      message: "Visitor data processed successfully.",
      data: result.value,
    });
  } catch (err) {
    console.error("Error in addVisitor:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = {
  getVisitors,
  addVisitor,
};
