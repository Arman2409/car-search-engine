import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'pg';

import cars from './data/cars.json';

export interface CarSearchCriteria {
    make?: string;
    model?: string;
    year?: number;
    body_type?: string;
    page?: number;
    size?: number;
    name?: string;
}

@Injectable()
export class DatabaseService {
    constructor(@Inject('DATABASE_POOL') private readonly pool: Pool,) { }

    async migrate() {
        try {
            // Create the cars table if it doesn't exist
            await this.pool.query(`
                CREATE TABLE IF NOT EXISTS cars (
                    id SERIAL PRIMARY KEY,
                    make VARCHAR(50) NOT NULL,
                    model VARCHAR(50) NOT NULL,
                    year INT NOT NULL,
                    body_type VARCHAR(50) NOT NULL
                );
            `);

            console.log('Cars table created or already exists');
        } catch (error) {

            console.error('Error creating cars table:', error);
        }
    }

    async seed() {
        try {
            // Clear existing data
            await this.pool.query('TRUNCATE TABLE cars RESTART IDENTITY CASCADE;');

            console.log(cars);

            // Bulk insert cars
            const carValues = cars.map((_, i) => {
                const base = i * 5; // Each car has 5 params: id, make, model, year, body_type
                return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5})`;
            }).join(', ');

            const carParams = cars.flatMap(c => [c.id, c.make, c.model, c.year, c.body_type]);

            await this.pool.query(
                `INSERT INTO cars (id, make, model, year, body_type) VALUES ${carValues}`,
                carParams
            );

            console.log(`Database seeded with ${cars.length} cars`);
        } catch (error) {
            console.error('Error seeding database:', error);
        }
    }

    async index() {
        try {
            // Create indexes for faster querying
            await this.pool.query(`
                CREATE INDEX IF NOT EXISTS idx_cars_make ON cars (make);
                CREATE INDEX IF NOT EXISTS idx_cars_model ON cars (model);
                CREATE INDEX IF NOT EXISTS idx_cars_year ON cars (year);
                CREATE INDEX IF NOT EXISTS idx_cars_body_type ON cars (body_type);
            `);

            console.log('Indexes created successfully');
        } catch (error) {
            console.error('Error creating indexes:', error);
        }
    }

    async searchCars(criteria: CarSearchCriteria): Promise<{ data: any[]; total: number }> {
        const conditions: string[] = [];
        const values: (string | number)[] = [];
        let paramCount = 1;
    
        // Handle the single combined search term
        if (criteria.name) {
            conditions.push(`(make || ' ' || model) ILIKE $${paramCount}`);
            values.push(`%${criteria.name}%`);
            paramCount++;
        }
    
        if (criteria.year) {
            conditions.push(`year = $${paramCount}`);
            values.push(criteria.year);
            paramCount++;
        }
    
        if (criteria.body_type) {
            conditions.push(`body_type = $${paramCount}`);
            values.push(criteria.body_type);
            paramCount++;
        }
    
        let query = 'SELECT * FROM cars';
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }
    
        // Pagination logic
        const page = criteria.page ? Math.max(1, Number(criteria.page)) : 1; // Ensure page is at least 1
        const size = criteria.size ? Math.max(1, Number(criteria.size)) : 10; // Default page size is 10
        const offset = (page - 1) * size;
    
        const countQuery = query.replace('SELECT *', 'SELECT COUNT(*)');
        query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
        values.push(size, offset);
    
        try {
            const result = await this.pool.query(query, values);
            const countResult = await this.pool.query(countQuery, values.slice(0, -2)); // Remove limit and offset values for count
    
            return {
                data: result.rows,
                total: parseInt(countResult.rows[0].count, 10),
            };
        } catch (error) {
            console.error('Error searching cars with pagination:', error);
            throw error;
        }
    }
}