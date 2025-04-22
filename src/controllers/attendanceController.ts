import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prismaClient';
import { EVENTS } from '../models/events';
import {
  AttendanceHistory,
  AttendanceApiResponse,
} from '../models/AttendanceTypes';

export const getAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1) Cast the query to an object { uin?: string }
    const uin = req.params.uin;

    // 2) Validate 'uin'
    if (!uin || typeof uin !== 'string') {
      throw new Error("'uin' is required and must be a string.");
    }

    // 3) Lookup the user by UIN
    const user = await prisma.users.findUnique({ where: { UIN: uin } });
    if (!user) {
      throw new Error('User not found');
    }

    // 4) Map over your Int fields in the user object
    //    Any value > 0 will be considered "attended"
    const AHC: AttendanceHistory[] = EVENTS.map((event) => {
      const val: number | undefined = user[event.name];
      return {
        eventName: event.name,
        attended: (val ?? 0) > 0,
      } as AttendanceHistory;
    });

    // 5) Build the final response
    const response: AttendanceApiResponse = {
      fullName: user.name,
      AHC,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const hello = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req);
    res.json(req);
  } catch (error) {
    next(error);
  }
};
