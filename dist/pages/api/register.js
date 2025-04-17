"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prismaClient_1 = __importDefault(require("../pages/api/prismaClient"));
const router = (0, express_1.Router)();
const eventMapping = {
    "00": "B&M GBM",
    "01": "Earth Che Night",
    "02": "Viet Field Day",
    "03": "Water Pokémon Go Event",
    "04": "Fire Gingerbread House Competition",
};
router.post('/', async (req, res) => {
    console.log('Request body:', req.body);
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
            console.log('User not found, creating a new user');
            user = await prismaClient_1.default.users.create({ data: { UIN, name } });
            console.log('User created:', user);
        }
        else {
            console.log('User already exists:', user);
        }
        const eventRecord = await prismaClient_1.default.event.findUnique({ where: { code: event } });
        if (!eventRecord) {
            console.log('Event record not found for code:', event);
            return res.status(404).json({ message: 'Event not found.' });
        }
        console.log('Event record found:', eventRecord);
        const existingAttendance = await prismaClient_1.default.attendance.findFirst({
            where: {
                userId: user.id,
                eventId: eventRecord.id,
            },
        });
        if (existingAttendance) {
            console.log('Attendance already registered for this event:', existingAttendance);
            return res.status(200).json({ message: 'Attendance already registered for this event.' });
        }
        else {
            console.log('Creating a new attendance record');
            await prismaClient_1.default.attendance.create({
                data: {
                    userId: user.id,
                    eventId: eventRecord.id,
                    attended: true,
                },
            });
            return res.status(200).json({ message: 'Attendance registered successfully.' });
        }
    }
    catch (error) {
        const errorMsg = error?.message || JSON.stringify(error) || 'Unknown error';
        console.error('Error registering attendance:', errorMsg);
        return res.status(500).json({ message: 'Internal Server Error', details: errorMsg });
    }
});
exports.default = router;
