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
    sessionId,
    lastVisited,
    screenResolution,
  } = req.body;

  try {
    const result = await portCollection.updateOne(
      { name, deviceType, browser, sessionId },
      {
        $inc: { count: 1 },
        $set: {
          lastVisited,
          screenResolution,
        },
      },
      { upsert: true }
    );

    res.send(result);
  } catch (err) {
    console.log("Error in postVisitor:", err);
  }
};

module.exports = { postMessage, getVisitors, postVisitor };
