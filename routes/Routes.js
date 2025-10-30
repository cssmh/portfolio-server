const express = require("express");
require("dotenv").config();
const { addVisitor, getVisitors } = require("../controllers/portfolio");
const portRoutes = express.Router();

const COUNT_ROUTE = process.env.COUNT;
const USERS_ROUTE = process.env.USERS;

portRoutes.put(COUNT_ROUTE, addVisitor);
portRoutes.get(USERS_ROUTE, getVisitors);

module.exports = portRoutes;
