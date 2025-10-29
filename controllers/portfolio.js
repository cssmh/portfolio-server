const client = require("../config/db");
const portCollection = client.db("Portfolio").collection("visitors");

const getVisitors = async (req, res) => {
  try {
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

const addVisitor = async (req, res) => {
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
  } = req.body;

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
    const result = await portCollection.updateOne(
      { name, deviceType, browser, sessionId },
      {
        $inc: { count: 1 },
        $set: {
          lastVisited,
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
          isTouchScreen,
          isMobile,
          isTablet,
          isDesktop,
          colorDepth,
          pixelRatio,
          sessionId,
          isOwner: !!isOwner,
        },
      },
      { upsert: true }
    );

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

module.exports = {
  getVisitors,
  addVisitor,
};
