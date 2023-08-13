import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        res.status(err.code).json({ error: err.message });
    } else {
        // If it's API error, in the console we will see the full error coming from the API
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
