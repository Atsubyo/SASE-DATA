import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // Handle GET requests: Fetch all users with their attendance records
    if (req.method === 'GET') {
      const users = await prisma.users.findMany({
        include: { attendances: true }  // Include related attendance records
      });
      return res.status(200).json(users);
    }

    // Handling POST requests: Creation of a new user
    if (req.method === 'POST') {
      const { UIN, name, event } = req.body;

      // Basic validation
      if (!UIN || !name) {
        return res.status(400).json({ message: 'UIN and name are required.' });
      }

      // Check if user already exists
      let user = await prisma.users.findUnique({
        where: { UIN }
      });

      if (user) {
        // Update user's attendance if the event is specified and not already marked
        if (event) {
          const eventKey = event.toUpperCase();
          if (user[eventKey] === 0) {
            user = await prisma.users.update({
              where: { UIN },
              data: { [eventKey]: 1 }
            });
          }
        }
        return res.status(200).json({ message: 'User already exists', user });
      }

      // Create a new user with optional initial attendance
      user = await prisma.users.create({
        data: {
          UIN,
          name,
          [event ? event.toUpperCase() : '']: event ? 1 : undefined,
        },
      });

      // Verifying if the user was successfully created
      const new_user = await prisma.users.findUnique({ where: { UIN } });
      if (new_user) {
        return res.status(201).json({ message: 'User created', user: new_user });
      } else {
        return res.status(500).json({ message: 'Failed to create user' });
      }
    }

    // Handling PUT requests: Updating the user by UIN
    if (req.method === 'PUT') {
      const {
        UIN,
        name,
        SPRINGINFO,
        BOBASOCIAL,
        CHEVRONGBM,
        COMSOC1,
        COMSOC2,
        COMSOC3,
        COMSOC4,
        COMSOC5,
        DOWGBM,
        ETAMGBM,
        LAUNCHGBM,
        LOCKHEEDGBM,
        SQUADMIXER,
        WILLIAMSGBM,
        PEPSICOGBM,
        GBM1,
      } = req.body;

      if (!UIN) {
        return res.status(400).json({ message: 'UIN is required to update user.' });
      }

      const updated_user = await prisma.users.update({
        where: { UIN },
        data: {
          name,
          SPRINGINFO,
          BOBASOCIAL,
          CHEVRONGBM,
          COMSOC1,
          COMSOC2,
          COMSOC3,
          COMSOC4,
          COMSOC5,
          DOWGBM,
          ETAMGBM,
          LAUNCHGBM,
          LOCKHEEDGBM,
          SQUADMIXER,
          WILLIAMSGBM,
          PEPSICOGBM,
          GBM1,
        },
      });
      return res.status(200).json({ message: 'User updated', updated_user });
    }

    // Handling DELETE requests: Deletion of a user by UIN (will get back to this soon)
    if (req.method === 'DELETE') {
      const { UIN } = req.body;

      if (!UIN) {
        return res.status(400).json({ message: 'UIN is required to delete user.' });
      }

      await prisma.users.delete({
        where: { UIN },
      });
      return res.status(204).end(); // Success with no content
    }

    // If method not allowed
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error("Error in users.ts:", error);
    return res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
}
