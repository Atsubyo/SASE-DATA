"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
function handler(req, res) {
    const serverTime = (0, moment_timezone_1.default)().tz('America/Chicago').format();
    res.status(200).json({ time: serverTime });
}
