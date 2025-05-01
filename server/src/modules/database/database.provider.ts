
import { Pool } from 'pg';

import { LoggerService } from '../../tools/logger.service';


export const DATABASE_PROVIDER_KEY = 'DATABASE_POOL';

const requiredEnvMap = {
    user: 'DB_USER',
    host: 'DB_HOST',
    database: 'DB_NAME',
};

const dbConfig: Record<keyof typeof requiredEnvMap, string> = {} as typeof requiredEnvMap;

const logger = new LoggerService();

export const DatabaseProvider = {
    provide: DATABASE_PROVIDER_KEY, // A unique token to identify this provider
    useFactory: async () => {
        for (const [key, envKey] of Object.entries(requiredEnvMap)) {
            const value = process.env[envKey];
            if (!value) {
                throw new Error(`Missing required environment variable: ${envKey}`);
            }
            dbConfig[key as keyof typeof requiredEnvMap] = value;
        }

        const pool = new Pool({
            ...dbConfig,
            password:  process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT || '5432', 10),
            max: 20, // Maximum number of clients in the pool
            idleTimeoutMillis: 30000, // How long a client can remain idle before being closed
            connectionTimeoutMillis: 2000, // How long to wait for a connection establishment
        });

        try {
            await pool.connect();
            logger.info('Database connected!');
            return pool;
        } catch (err) {
            logger.error(`Error connecting to database pool: ${err}`);
            throw err;
        }
    },
    inject: [],
};