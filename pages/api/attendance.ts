import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prismaClient'; // Import Prisma client

// API handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { uin } = req.query;

    // Basic validation
    if (!uin || typeof uin !== 'string') {
      return res.status(400).json({ message: "'uin' is required and must be a string." });
    }

    try {
      // Check if user exists and fetch attendance
      const user = await prisma.users.findUnique({
        where: { UIN: uin },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Collect attended events
      const attendedEvents = Object.keys(user).filter(key => user[key] === 1);

      res.status(200).json({ attendedEvents });
    } catch (error) {
      console.error("Error in GET /api/attendance:", error);
      res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
  } else if (req.method === 'POST') {
    const { uin, event } = req.body;

    // Basic validation
    if (!uin || !event) {
      return res.status(400).json({ message: "'uin' and 'event' are required." });
    }

    try {
      // Update or create user and mark attendance
      const user = await prisma.users.upsert({
        where: { UIN: uin },
        update: { [event.toUpperCase()]: 1 },
        create: { UIN: uin, [event.toUpperCase()]: 1 },
      });

      res.status(200).json({ message: 'Attendance marked', user });
    } catch (error) {
      console.error("Error in POST /api/attendance:", error);
      res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
