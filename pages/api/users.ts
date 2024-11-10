import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import type { RequestyBody } from "~/types/UserTypes";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //Handling GET requests: Fetch all users with their attendance records
    if (req.method === "GET") {
      const users = await prisma.users.findMany({
        include: { attendances: true },
      });
      return res.status(200).json(users);
    }

    //Handling POST requests: Creation of a new user or updating target user's attendance
    if (req.method === "POST") {
      const { UIN, name, event, timestamp } = req.body as RequestyBody;

      //Basic validation
      if (!UIN || !name) {
        return res.status(400).json({ message: "UIN and name are required." });
      }

      //Checking if user already exists
      let user = await prisma.users.findUnique({
        where: { UIN },
      });

      if (user) {
        //Updating attendance for the target user if event is specified and not already marked
        if (event) {
          const eventKey = event.toUpperCase();
          if (!user[eventKey]) {
            await prisma.users.update({
              where: { UIN },
              data: { [eventKey]: timestamp },
            });
          }
        }
        return res.status(200).json({ message: "User already exists", user });
      }

      //Creation of a new user with optional initial attendance (naturally empty if no prior records exist in the database)
      user = await prisma.users.create({
        data: {
          UIN,
          name,
          [event ? event.toUpperCase() : ""]: event ? timestamp : undefined,
        },
      });
      return res.status(201).json({ message: "User created", user });
    }

    //Handling DELETE requests: Deletion of a user by UIN (will get back to this soon)
    if (req.method === "DELETE") {
      const { UIN } = req.body as RequestyBody;

      if (!UIN) {
        return res
          .status(400)
          .json({ message: "UIN is required to delete user." });
      }

      await prisma.users.delete({
        where: { UIN },
      });
      return res.status(204).end(); // Success with no content
    }

    //If the method is not allowed
    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Error in users.ts:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      details:
        error instanceof Error ? error.message : "An unkonwn erro ocurred.",
    });
  }
}
