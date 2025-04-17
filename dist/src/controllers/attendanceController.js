"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendance = void 0;
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
const events_1 = require("../models/events");
const getAttendance = async (req, res, next) => {
    try {
        // 1) Cast the query to an object { uin?: string }
        const { uin } = req.query;
        // 2) Validate 'uin'
        if (!uin || typeof uin !== 'string') {
            throw new Error("'uin' is required and must be a string.");
        }
        // 3) Lookup the user by UIN
        const user = await prismaClient_1.default.users.findUnique({ where: { UIN: uin } });
        if (!user) {
            throw new Error('User not found');
        }
        // 4) Map over your Int fields in the user object
        //    Any value > 0 will be considered "attended"
        const AHC = events_1.EVENTS.map((event) => {
            const val = user[event.name];
            return {
                eventName: event.name,
                attended: (val ?? 0) > 0,
            };
        });
        // 5) Build the final response
        const response = {
            fullName: user.name,
            AHC,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getAttendance = getAttendance;
