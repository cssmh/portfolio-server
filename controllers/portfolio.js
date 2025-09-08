const client = require("../config/db");
const portCollection = client.db("Portfolio").collection("visitors");
const messageCollection = client.db("Portfolio").collection("message");

const postMessage = async (req, res) => {
  try {
    const result = await messageCollection.insertOne(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
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
    const result = await portCollection.find().sort({ _id: -1 }).toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
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
  } = req.body;

  // Validate required fields
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
    // Update or insert the visitor data
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
        },
      },
      { upsert: true }
    );

    // Log the result for debugging
    // console.log("Visitor data updated/inserted:", result);

    // Send a structured response
    res.status(200).json({
      success: true,
      message: "Visitor data processed successfully.",
      data: result,
    });
  } catch (err) {
    console.error("Error in postVisitor:", err);
  }
};

module.exports = { postMessage, getMessages, getVisitors, postVisitor };
