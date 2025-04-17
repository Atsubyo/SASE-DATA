"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEvent = void 0;
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
const events_1 = require("../models/events");
const registerEvent = async (req, res, next) => {
    try {
        const { UIN, name, event } = req.body;
        if (!UIN || !name || !event) {
            throw new Error('UIN, name, and event are required fields.');
        }
        const eventTitle = events_1.eventMapping[event];
        if (!eventTitle) {
            throw new Error('Invalid event code.');
        }
        let user = await prismaClient_1.default.users.findUnique({ where: { UIN } });
        if (!user) {
            user = await prismaClient_1.default.users.create({ data: { UIN, name } });
        }
        const eventRecord = await prismaClient_1.default.event.findUnique({
            where: { code: event },
        });
        if (!eventRecord) {
            throw new Error('Event not found.');
        }
        const existingAttendance = await prismaClient_1.default.attendance.findFirst({
            where: { userId: user.id, eventId: eventRecord.id },
        });
        if (existingAttendance) {
            res.json({ message: 'Attendance already registered for this event.' });
        }
        else {
            await prismaClient_1.default.attendance.create({
                data: {
                    userId: user.id,
                    eventId: eventRecord.id,
                    attended: true,
                },
            });
            res.json({ message: 'Attendance registered successfully.' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.registerEvent = registerEvent;
