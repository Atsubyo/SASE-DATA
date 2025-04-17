"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/time.ts
const express_1 = require("express");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const router = (0, express_1.Router)();
router.get('/time', (_req, res) => {
    const serverTime = (0, moment_timezone_1.default)().tz('America/Chicago').format();
    res.status(200).json({ time: serverTime });
});
exports.default = router;
