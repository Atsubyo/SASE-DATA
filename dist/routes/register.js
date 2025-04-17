"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/register.ts
const express_1 = require("express");
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
const router = (0, express_1.Router)();
const eventMapping = {
    "00": "B&M GBM",
    "01": "Earth Che Night",
    "02": "Viet Field Day",
    "03": "Water Pokémon Go Event",
    "04": "Fire Gingerbread House Competition",
};
router.post('/', async (req, res) => {
    const { UIN, name, event } = req.body;
    if (!UIN || !name || !event) {
        return res.status(400).json({ message: 'UIN, name, and event are required.' });
    }
    const eventTitle = eventMapping[event];
    if (!eventTitle) {
        return res.status(400).json({ message: 'Invalid event code.' });
    }
    try {
        let user = await prismaClient_1.default.users.findUnique({ where: { UIN } });
        if (!user) {
            user = await prismaClient_1.default.users.create({ data: { UIN, name } });
        }
        const eventRecord = await prismaClient_1.default.event.findUnique({ where: { code: event } });
        if (!eventRecord) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        const existingAttendance = await prismaClient_1.default.attendance.findFirst({
            where: { userId: user.id, eventId: eventRecord.id },
        });
        if (existingAttendance) {
            return res.status(200).json({ message: 'Attendance already registered for this event.' });
        }
        await prismaClient_1.default.attendance.create({
            data: {
                userId: user.id,
                eventId: eventRecord.id,
                attended: true,
            },
        });
        return res.status(200).json({ message: 'Attendance registered successfully.' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', details: error.message || 'Unknown error' });
    }
});
exports.default = router;
