"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const prismaClient_1 = __importDefault(require("./prismaClient"));
// Mapping from event codes to event titles
const eventMapping = {
    "00": "B&M GBM",
    "01": "Earth Che Night",
    "02": "Viet Field Day",
    "03": "Water Pokémon Go Event",
    "04": "Fire Gingerbread House Competition",
};
async function handler(req, res) {
    if (req.method === "POST") {
        console.log("Request body:", req.body);
        if (!req.body || typeof req.body !== "object") {
            return res
                .status(400)
                .json({ message: "No request body provided or invalid body format." });
        }
        const { UIN, name, event } = req.body;
        if (!UIN || !name || !event) {
            return res
                .status(400)
                .json({ message: "UIN, name, and event are required." });
        }
        const eventTitle = eventMapping[event];
        if (!eventTitle) {
            return res.status(400).json({ message: "Invalid event code." });
        }
        try {
            let user = await prismaClient_1.default.users.findUnique({ where: { UIN } });
            if (!user) {
                console.log("User not found, creating a new user");
                user = await prismaClient_1.default.users.create({
                    data: {
                        UIN,
                        name,
                    },
                });
                console.log("User created:", user);
            }
            else {
                console.log("User already exists:", user);
            }
            const eventRecord = await prismaClient_1.default.event.findUnique({
                where: { code: event },
            });
            if (!eventRecord) {
                console.log("Event record not found for title:", eventTitle);
                return res.status(404).json({ message: "Event not found." });
            }
            console.log("Event record found:", eventRecord);
            const existingAttendance = await prismaClient_1.default.attendance.findFirst({
                where: {
                    userId: user.id,
                    eventId: eventRecord.id,
                },
            });
            if (existingAttendance) {
                console.log("Attendance already registered for this event:", existingAttendance);
                return res
                    .status(200)
                    .json({ message: "Attendance already registered for this event." });
            }
            else {
                console.log("Creating a new attendance record");
                // Create a new attendance record linking the user to the event
                await prismaClient_1.default.attendance.create({
                    data: {
                        userId: user.id,
                        eventId: eventRecord.id,
                        attended: true,
                    },
                });
                return res
                    .status(200)
                    .json({ message: "Attendance registered successfully." });
            }
        }
        catch (error) {
            // Ensure we have a proper error message even if error is null
            const errorMsg = error
                ? error instanceof Error
                    ? error.message
                    : JSON.stringify(error)
                : "Unknown error";
            console.error("Error registering attendance:", errorMsg);
            return res.status(500).json({
                message: "Internal Server Error",
                details: errorMsg,
            });
        }
    }
    else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
