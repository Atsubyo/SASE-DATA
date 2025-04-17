"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/users.ts
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get('/users', async (_req, res) => {
    try {
        const users = await prisma.users.findMany({ include: { attendances: true } });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
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
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
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
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.default = router;
