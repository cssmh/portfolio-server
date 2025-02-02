const express = require("express");
require("dotenv").config();
const { postMessage, getVisitors, postVisitor } = require("../controllers/portfolio");
const router = express.Router();

router.post(process.env.MESSAGE, postMessage);
router.get(process.env.USERS, getVisitors);
router.put(process.env.COUNT, postVisitor);

module.exports = router;
