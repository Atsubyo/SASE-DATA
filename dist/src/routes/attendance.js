"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendanceController_1 = require("../controllers/attendanceController");
const router = (0, express_1.Router)();
router.get('/', attendanceController_1.getAttendance);
exports.default = router;
