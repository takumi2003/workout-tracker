// controllers/userController.ts
import { Request, Response } from 'express';
import pool from '../db';

export const createUser = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    
    if (!name || !password) {
    return res.status(400).json({ error: 'Name and password are required' });
    }

    try {
    const result = await pool.query(
            'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *',
            [name, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};


