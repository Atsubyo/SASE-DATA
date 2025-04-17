"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const client_1 = require("@prisma/client"); // Import the generated types from Prisma
const prisma = new client_1.PrismaClient();
async function handler(req, res) {
    try {
        console.log("Received request with method:", req.method);
        // Handling GET requests: Fetch all users with their attendance records
        if (req.method === "GET") {
            console.log("Fetching all users...");
            const users = await prisma.users.findMany({
                include: { attendances: true },
            });
            console.log("Fetched users:", users);
            return res.status(200).json(users);
        }
        // Handling POST requests: Creation of a new user or updating target user's attendance
        if (req.method === "POST") {
            console.log("Processing POST request...");
            const { UIN, name, event } = req.body;
            console.log("POST data:", { UIN, name, event });
            // Basic validation
            if (!UIN || !name) {
                console.log("Validation failed: UIN or name missing.");
                return res.status(400).json({ message: "UIN and name are required." });
            }
            // Checking if user already exists
            console.log("Checking if user exists...");
            let user = await prisma.users.findUnique({
                where: { UIN },
            });
            console.log("User found:", user);
            if (user) {
                const typeSafeUser = user; // Casting to a type with event keys
                // Updating attendance for the target user if event is specified and not already marked
                if (event) {
                    const eventKey = event.toUpperCase();
                    console.log(`Checking attendance for event: ${eventKey}`);
                    if (!typeSafeUser[eventKey]) {
                        console.log("Event not marked. Updating attendance...");
                        await prisma.users.update({
                            where: { UIN },
                            data: { [eventKey]: name },
                        });
                        console.log("Attendance updated.");
                    }
                    else {
                        console.log("Event already marked.");
                    }
                }
                return res.status(200).json({ message: "User already exists", user });
            }
            // Creation of a new user with optional initial attendance
            console.log("Creating new user...");
            user = await prisma.users.create({
                data: {
                    UIN,
                    name,
                    ...(event ? { [event.toUpperCase()]: name } : {}),
                },
            });
            console.log("User created:", user);
            return res.status(201).json({ message: "User created", user });
        }
        // Handling DELETE requests: Deletion of a user by UIN
        if (req.method === "DELETE") {
            console.log("Processing DELETE request...");
            const { UIN } = req.body;
            console.log("DELETE data:", { UIN });
            if (!UIN) {
                console.log("Validation failed: UIN missing.");
                return res
                    .status(400)
                    .json({ message: "UIN is required to delete user." });
            }
            console.log("Deleting user...");
            await prisma.users.delete({
                where: { UIN },
            });
            console.log("User deleted.");
            return res.status(204).end(); // Success with no content
        }
        // If the method is not allowed
        console.log("Invalid method:", req.method);
        return res.status(405).json({ message: "Method not allowed" });
    }
    catch (error) {
        console.error("Error in users.ts:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            details: error instanceof Error ? error.message : "An unknown error occurred.",
        });
    }
}
