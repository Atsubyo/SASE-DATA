import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prismaClient'; // Import the Prisma client
import type {
  AttendanceHistory,
  AttendanceApiResponse,
} from "~/types/AttendanceTypes";
import type { Users } from "@prisma/client";

const EVENT_COLUMNS: string[] = [
  "INFORMATIONAL",
  "WILLIAMSGBM",
  "BOBASOCIAL",
  "CDMSMITH",
  "SQUADREVEALSOCIAL",
  "RESUMEROAST",
  "GEVERNOVA",
  "KIMCHISCAVENGERHUNT",
  "KDASOCIAL",
  "SWRIGBM",
  "SQUIDSQUADGAMES",
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "GET") {
    const { uin } = req.query;

    console.log("Received request with UIN:", uin);

    if (!uin || typeof uin !== "string") {
      console.log("Invalid UIN provided.");
      return res
        .status(400)
        .json({ message: "'uin' is required and must be a string." });
    }

    console.log("Fetching user from the database...");
    // Fetching the user based on UIN
    const user = await prisma.users.findUnique({
      where: { UIN: uin },
    });

    console.log("User fetched:", user);

    if (!user) {
      console.log("User not found.");
      return res.status(404).json({ message: "User not found" });
    }

    // Collecting attendance history
    console.log("Collecting attendance history...");
    const AHC: AttendanceHistory[] = EVENT_COLUMNS.map((event) => ({
      event_name: event,
      attended: !!user[event as keyof Users],
    }));

    console.log("Attendance history collected:", AHC);

    const response: AttendanceApiResponse = {
      full_name: user.name,
      AHC,
    };

    console.log("Responding with user data:", response);
    // Make sure to return here so we don't fall through to any subsequent code
    return res.status(200).json(response);
  } else {
    console.log("Invalid method received:", req.method);
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}


