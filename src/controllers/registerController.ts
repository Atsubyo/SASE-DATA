import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prismaClient';
import { eventMapping } from '../models/events';

export const registerEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { UIN, name, event } = req.body;

    if (!UIN || !name || !event) {
      throw new Error('UIN, name, and event are required fields.');
    }

    const eventTitle = eventMapping[event];
    if (!eventTitle) {
      throw new Error('Invalid event code.');
    }
    let user = await prisma.users.findUnique({ where: { UIN } });
    if (!user) {
      user = await prisma.users.create({ data: { UIN, name } });
    }

    const eventRecord = await prisma.event.findUnique({
      where: { code: event },
    });
    if (!eventRecord) {
      throw new Error('Event not found.');
    }

    const existingAttendance = await prisma.attendance.findFirst({
      where: { userId: user.id, eventId: eventRecord.id },
    });

    if (existingAttendance) {
      res.json({ message: 'Attendance already registered for this event.' });
    } else {
      await prisma.attendance.create({
        data: {
          userId: user.id,
          eventId: eventRecord.id,
          attended: true,
        },
      });

      res.json({ message: 'Attendance registered successfully.' });
    }
  } catch (error) {
    next(error);
  }
};
