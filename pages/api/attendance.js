import express from 'express';
import cors from 'cors';
import prisma from './prismaClient'; // Ensure path is correct
import type { AttendanceHistory, AttendanceApiResponse } from './types/AttendanceTypes';
import type { Users } from '@prisma/client';

const router = express.Router();

// Apply CORS middleware
router.use(cors());
router.use(express.json());

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

// GET /api/attendance
router.get('/attendance', async (req, res) => {
    const uin = req.query.uin as string;

    console.log("Received request with UIN:", uin);

    if (!uin || typeof uin !== 'string') {
        console.log("Invalid UIN provided.");
        return res.status(400).json({ message: "'uin' is required and must be a string." });
    }

    try {
        console.log("Fetching user from the database...");
        const user = await prisma.users.findUnique({ where: { UIN: uin } }) as Users | null;

        console.log("User fetched:", user);

        if (!user) {
            console.log("User not found.");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Collecting attendance history...");
        const AHC: AttendanceHistory[] = EVENT_COLUMNS.map(event => ({
            event_name: event,
            attended: !!user[event as keyof Users],
        }));

        const response: AttendanceApiResponse = {
            full_name: user.name,
            AHC,
        };

        console.log("Responding with user data:", response);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error in GET /api/attendance:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            details: error instanceof Error ? error.message : "An unknown error occurred.",
        });
    }
});

export default router;
