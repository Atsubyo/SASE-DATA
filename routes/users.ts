// routes/users.ts
import { Router, Request, Response } from 'express';
import { PrismaClient, type Users } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

interface RequestBody {
    UIN: string;
    name: string;
    event?: string;
}

interface UserWEvents extends Users {
    [key: string]: number | string | null;
}

router.get('/users', async (_req: Request, res: Response) => {
    try {
        const users = await prisma.users.findMany({ include: { attendances: true } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/users', async (req: Request, res: Response) => {
    try {
        const { UIN, name, event } = req.body as RequestBody;

        if (!UIN || !name) {
            return res.status(400).json({ message: 'UIN and name are required.' });
        }

        let user = await prisma.users.findUnique({ where: { UIN } });

        if (user) {
            const typeSafeUser = user as UserWEvents;

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
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/users', async (req: Request, res: Response) => {
    try {
        const { UIN } = req.body as { UIN: string };
        if (!UIN) {
            return res.status(400).json({ message: 'UIN is required to delete user.' });
        }

        await prisma.users.delete({ where: { UIN } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;