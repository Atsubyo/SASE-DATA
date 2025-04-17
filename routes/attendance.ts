import { Router, Request, Response } from 'express';
import prisma from '../prisma/prismaClient';
import type { AttendanceApiResponse, AttendanceHistory } from '../src/types/AttendanceTypes';

// These must exactly match the INT fields in your "Users" Prisma model:
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

const router = Router();

/**
 * In this minimal version, we don't use generics on router.get() or on Request/Response.
 * Instead, we cast req.query inside the handler to a known structure.
 */
router.get('/attendance', async (req, res) => {
    try {
        // 1) Cast the query to an object { uin?: string }
        const { uin } = req.query as { uin?: string };

        // 2) Validate 'uin'
        if (!uin || typeof uin !== 'string') {
            return res
                .status(400)
                .json({ message: "'uin' is required and must be a string." });
        }

        // 3) Lookup the user by UIN
        const user = await prisma.users.findUnique({ where: { UIN: uin } });
        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found" });
        }

        // 4) Map over your Int fields in the user object
        //    Any value > 0 will be considered "attended"
        const AHC: AttendanceHistory[] = EVENT_COLUMNS.map(event => {
            const val = user[event as keyof typeof user] as number | undefined;
            return {
                event_name: event,
                attended: (val ?? 0) > 0,
            };
        });

        // 5) Build the final response
        const response: AttendanceApiResponse = {
            full_name: user.name,
            AHC,
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error in GET /attendance:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
