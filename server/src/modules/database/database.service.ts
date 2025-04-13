import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'pg';

import cars from './data/cars.json';
import { getAllInsertionQuery, indexesCreationQuery, migrationQuery } from './data/queries';
import { DATABASE_PROVIDER_KEY } from './database.provider';
import type { CarSearchCriteria } from '../../types/modules/search';
import type { Car } from '../../types/global';

@Injectable()
export class DatabaseService {
    constructor(@Inject(DATABASE_PROVIDER_KEY) private readonly pool: Pool) { }

    async migrate() {
        try {
            // Create the cars table if it doesn't exist
            await this.pool.query(migrationQuery);

            console.log('Database migrated successfully');
        } catch (error) {

            console.error('Error creating cars table:', error);
        }
    }

    async seed() {
        try {
            // Clear existing data
            await this.pool.query('TRUNCATE TABLE cars RESTART IDENTITY CASCADE;');

            // Bulk insert cars
            const carValues = cars.map((_, i) => {
                const base = i * 5; // Each car has 5 params: id, make, model, year, body_type
                return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5})`;
            }).join(', ');

            const carParams = cars.flatMap(({ id, make, model, year, body_type }: Car) => {
                return [id, make, model, year, body_type]
            });

            await this.pool.query(
                getAllInsertionQuery(carValues),
                carParams
            );

            console.log(`Database seeded with ${cars.length} cars successfully`);
        } catch (error) {
            console.error('Error seeding database:', error);
        }
    }

    async index() {
        try {
            // Create indexes for faster querying
            await this.pool.query(indexesCreationQuery);

            console.log('Indexes created successfully');
        } catch (error) {
            console.error('Error creating indexes:', error);
        }
    }

    async searchCars(criteria: CarSearchCriteria): Promise<{ data: Car[]; total: number }> {
        const conditions: string[] = [];
        const values: (string | number)[] = [];
        let paramCount = 1;

        // Handle the single combined search term
        if (criteria.name) {
            conditions.push(`CONCAT(make, ' ', model) ILIKE $${paramCount}`);
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

    async getUniqueModelsOrMakes(type: 'make' | 'model'): Promise<string[]> {
        const query = `SELECT DISTINCT ${type} FROM cars`;
        const result = await this.pool.query(query);

        return result.rows.map(row => row[type]); // Extract the `model` values
    }

}