const express = require("express");
require("dotenv").config();
const {
  postMessage,
  getVisitors,
  postVisitor,
  getMessages,
  deleteVisitorBySession,
} = require("../controllers/portfolio");
const portRoutes = express.Router();

portRoutes.get(process.env.GETMESSAGE, getMessages);
portRoutes.post(process.env.MESSAGE, postMessage);
portRoutes.get(process.env.USERS, getVisitors);
portRoutes.put(process.env.COUNT, postVisitor);
portRoutes.delete(process.env.DELETEVISITOR, deleteVisitorBySession);

module.exports = portRoutes;
