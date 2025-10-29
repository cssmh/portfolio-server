const client = require("../config/db");
const portCollection = client.db("Portfolio").collection("visitors");
const messageCollection = client.db("Portfolio").collection("message");

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
    // Upsert the visitor but also store isOwner flag (if any)
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
