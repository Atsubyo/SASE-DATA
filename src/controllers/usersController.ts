import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RequestBody {
  UIN: string;
  name: string;
  event?: string;
}

interface UserWEvents {
  [key: string]: number | string | null;
}

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await prisma.users.findMany({
      include: { attendances: true },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { UIN, name, event } = req.body as RequestBody;

    if (!UIN || !name) {
      throw new Error('UIN and name are required');
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
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const UIN = req.params.uin;
    
    if (!UIN) {
      throw new Error('UIN is required to delete user.');
    }

    await prisma.users.delete({ where: { UIN } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
