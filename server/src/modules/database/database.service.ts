import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'pg';

import { LoggerService } from '../../tools/logger.service';
import cars from './data/cars.json';
import { getAllInsertionQuery, indexesCreationQuery, migrationQuery } from './data/queries';
import { DATABASE_PROVIDER_KEY } from './database.provider';
import type { CarSearchCriteria } from '../../types/modules/search';
import type { Car, ErrorResult } from '../../types/global';
import type { SelectFilter } from '../../types/modules/cars';


@Injectable()
export class DatabaseService {
    constructor(
        @Inject(DATABASE_PROVIDER_KEY) private readonly pool: Pool,
        private readonly logger: LoggerService,
    ) { }

    async migrate(): Promise<void | ErrorResult> {
        try {
            // Create the cars table if it doesn't exist
            await this.pool.query(migrationQuery);

            this.logger.info('Database migrated successfully');
        } catch (error) {
            this.logger.error("Error creating cars table:", error);

            return {
                error: 'Error creating cars table',
            }
        }
    }

    async seed(): Promise<void | ErrorResult> {
        try {
            // Clear existing data
            await this.pool.query('TRUNCATE TABLE cars RESTART IDENTITY CASCADE;');

            // Bulk insert cars
            const carValues = cars.map((_, i) => {
                const base = i * 4; // Each car has 5 params: id, make, model, body_type
                return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`;
            }).join(', ');

            const carParams = cars.flatMap(({ id, make, model, body_type }: Car) => {
                return [id, make, model, body_type]
            });

            console.log(carValues);

            await this.pool.query(
                getAllInsertionQuery(carValues),
                carParams
            );

            this.logger.info(`Database seeded with ${cars.length} cars successfully`);
        } catch (error) {
            this.logger.error("Error seeding database", error);
            return {
                error: 'Error seeding database',
            }
        }
    }

    async index(): Promise<void | ErrorResult> {
        try {
            // Create indexes for faster querying
            await this.pool.query(indexesCreationQuery);

            this.logger.info('Indexes created successfully');
        } catch (error) {
            this.logger.error("Error creating indexes:", error.message);

            return {
                error: 'Error creating indexes',
            }
        }
    }

    async searchCars(
        criteria: CarSearchCriteria
    ): Promise<{ data: Car[]; total: number } | ErrorResult> {

        const conditions: string[] = [];
        const values: (string | number)[] = [];
        let paramCount = 1;

        // Handle the single combined search term
        if (criteria.name) {
            conditions.push(`CONCAT(make, ' ', model) ILIKE $${paramCount}`);
            values.push(`%${criteria.name}%`);
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
        const size = criteria.limit ? Math.max(1, Number(criteria.limit)) : 10; // Default page size is 10
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
            this.logger.error("Error searching cars with pagination:", error);
            return {
                error: 'Error searching cars with pagination:',
            }
        }
    }

    async getUniqueFilterData(dataType: SelectFilter): Promise<string[] | ErrorResult> {
        try {
            let type = dataType.slice(0, -1); // Remove the trailing "s" to match the database column names

            if (type === "bodyType") {
                type = "body_type";
            }

            const query = `SELECT DISTINCT ${type} FROM cars`;
            const result = await this.pool.query(query);

            return result.rows.map(row => row[type]); // Extract the `model` values
        } catch (error) {
            this.logger.error("Error fetching unique makes or models:", error);
            return {
                error: "Error fetching unique makes or models",
            }
        }
    }

}