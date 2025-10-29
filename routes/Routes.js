const express = require("express");
require("dotenv").config();
const { addVisitor, getVisitors } = require("../controllers/portfolio");
const portRoutes = express.Router();

portRoutes.put(process.env.COUNT, addVisitor);
portRoutes.get(process.env.USERS, getVisitors);

module.exports = portRoutes;
