import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prismaClient';
import { Users } from '@prisma/client';

// Mapping from event codes to event titles
const eventMapping: Record<string, string> = {
  "00": "B&M GBM",
  "01": "Earth Che Night",
  "02": "Viet Field Day",
  "03": "Water Pokémon Go Event",
  "04": "Fire Gingerbread House Competition"
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log("Request body:", req.body);
    
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ message: 'No request body provided or invalid body format.' });
    }
    
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
        console.log("User not found, creating a new user");
        user = await prisma.users.create({
          data: {
            UIN,
            name,
          },
        });
        console.log("User created:", user);
      } else {
        console.log("User already exists:", user);
      }

      //const eventRecord = await prisma.event.findUnique({ where: { title: eventTitle } });
      const eventRecord = await prisma.event.findUnique({ where: { code: event } });
      if (!eventRecord) {
        console.log("Event record not found for title:", eventTitle);
        return res.status(404).json({ message: 'Event not found.' });
      }
      console.log("Event record found:", eventRecord);

      const existingAttendance = await prisma.attendance.findFirst({
        where: {
          userId: user.id,
          eventId: eventRecord.id,
        },
      });

      if (existingAttendance) {
        console.log("Attendance already registered for this event:", existingAttendance);
        return res.status(200).json({ message: 'Attendance already registered for this event.' });
      } else {
        console.log("Creating a new attendance record");
        // Create a new attendance record linking the user to the event
        await prisma.attendance.create({
          data: {
            userId: user.id,
            eventId: eventRecord.id,
            attended: true,
          },
        });
        return res.status(200).json({ message: 'Attendance registered successfully.' });
      }
    } catch (error) {
        // Ensure we have a proper error message even if error is null
        const errorMsg = error 
          ? (error instanceof Error ? error.message : JSON.stringify(error))
          : 'Unknown error';
      
        console.error('Error registering attendance:', errorMsg);
      
        return res.status(500).json({
          message: 'Internal Server Error',
          details: errorMsg
        });
      }
      
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
