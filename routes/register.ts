// routes/register.ts
import { Router, Request, Response } from 'express';
import prisma from '../prisma/prismaClient';

const router = Router();

const eventMapping: Record<string, string> = {
    "00": "B&M GBM",
    "01": "Earth Che Night",
    "02": "Viet Field Day",
    "03": "Water Pokémon Go Event",
    "04": "Fire Gingerbread House Competition",
};

router.post('/', async (req: Request, res: Response) => {
    const { UIN, name, event } = req.body;

    if (!UIN || !name || !event) {
        return res.status(400).json({ message: 'UIN, name, and event are required.' });
    }

    const eventTitle = eventMapping[event];
    if (!eventTitle) {
        return res.status(400).json({ message: 'Invalid event code.' });
    }

    try {
        let user = await prisma.users.findUnique({ where: { UIN } });
        if (!user) {
            user = await prisma.users.create({ data: { UIN, name } });
        }

        const eventRecord = await prisma.event.findUnique({ where: { code: event } });
        if (!eventRecord) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        const existingAttendance = await prisma.attendance.findFirst({
            where: { userId: user.id, eventId: eventRecord.id },
        });

        if (existingAttendance) {
            return res.status(200).json({ message: 'Attendance already registered for this event.' });
        }

        await prisma.attendance.create({
            data: {
                userId: user.id,
                eventId: eventRecord.id,
                attended: true,
            },
        });

        return res.status(200).json({ message: 'Attendance registered successfully.' });
    } catch (error: any) {
        return res.status(500).json({ message: 'Internal Server Error', details: error.message || 'Unknown error' });
    }
});

export default router;