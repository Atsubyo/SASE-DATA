"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.addUser = exports.getUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUser = async (req, res, next) => {
    try {
        const users = await prisma.users.findMany({
            include: { attendances: true },
        });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
const addUser = async (req, res, next) => {
    try {
        const { UIN, name, event } = req.body;
        if (!UIN || !name) {
            throw new Error('UIN and name are required');
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
            res.status(200).json({ message: 'User already exists', user });
            return;
        }
        user = await prisma.users.create({
            data: {
                UIN,
                name,
                ...(event ? { [event.toUpperCase()]: name } : {}),
            },
        });
        res.status(201).json({ message: 'User created', user });
    }
    catch (error) {
        next(error);
    }
};
exports.addUser = addUser;
const deleteUser = async (req, res, next) => {
    try {
        const { UIN } = req.body;
        if (!UIN) {
            throw new Error('UIN is required to delete user.');
        }
        await prisma.users.delete({ where: { UIN } });
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
