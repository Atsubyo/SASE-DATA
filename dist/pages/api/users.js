"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// GET all users with their attendance records
router.get('/users', async (_req, res) => {
    try {
        const users = await prisma.users.findMany({ include: { attendances: true } });
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error in GET /users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// POST: create new user or update attendance
router.post('/users', async (req, res) => {
    try {
        const { UIN, name, event } = req.body;
        if (!UIN || !name) {
            return res.status(400).json({ message: 'UIN and name are required.' });
        }
        let user = await prisma.users.findUnique({ where: { UIN } });
        if (user) {
            const typeSafeUser = user;
            if (event) {
                const eventKey = event.toUpperCase();
                if (!typeSafeUser[eventKey]) {
                    await prisma.users.update({
                        where: { UIN },
                        data: { [eventKey]: name },
                    });
                }
            }
            return res.status(200).json({ message: 'User already exists', user });
        }
        // Create new user
        user = await prisma.users.create({
            data: {
                UIN,
                name,
                ...(event ? { [event.toUpperCase()]: name } : {}),
            },
        });
        return res.status(201).json({ message: 'User created', user });
    }
    catch (error) {
        console.error('Error in POST /users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// DELETE user by UIN
router.delete('/users', async (req, res) => {
    try {
        const { UIN } = req.body;
        if (!UIN) {
            return res.status(400).json({ message: 'UIN is required to delete user.' });
        }
        await prisma.users.delete({ where: { UIN } });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error in DELETE /users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.default = router;
