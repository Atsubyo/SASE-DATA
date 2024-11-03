import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prismaClient'; // Import the Prisma client
import type { AttendanceHistory } from "~/types/AttendanceTypes";

const EVENT_COLUMNS = [
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { uin } = req.query;

    if (!uin || typeof uin !== "string") {
      return res
        .status(400)
        .json({ message: "'uin' is required and must be a string." });
    }

    try {
      //Fetching the user based on UIN
      const user = await prisma.users.findUnique({
        where: { UIN: uin },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      //Collecting attendance history
      const AHC: AttendanceHistory[] = EVENT_COLUMNS.map(
        (event): AttendanceHistory => ({
          event_name: event,
          attended: user[event] === 1,
          timestamp: user[event] === 1 ? (user["Timestamp"] as string) : null,
        })
      );

      res.status(200).json({
        full_name: user.name,
        AHC,
      });
    } catch (error) {
      console.error("Error in GET /api/attendance:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        details:
          error instanceof Error ? error.message : "An unkonwn erro ocurred.",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
