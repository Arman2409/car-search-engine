import Redis from 'ioredis';

import { LoggerService } from '../../tools/logger.service';


export const CACHE_CLIENT_KEY = 'REDIS_CLIENT'; // A unique token to identify this provider

const requiredEnvMap = {
    host: 'REDIS_HOST',
    port: 'REDIS_PORT',
};

const redisConfig: Record<keyof typeof requiredEnvMap, string | number> = {} as typeof requiredEnvMap;

const logger = new LoggerService();

export const CacheProvider = {
    provide: CACHE_CLIENT_KEY, // Unique token for Redis client
    useFactory: async () => {
        try {
            // Validate and populate Redis configuration
            for (const [key, envKey] of Object.entries(requiredEnvMap)) {
                const value = process.env[envKey];
                if (!value) {
                    throw new Error(`Missing required environment variable: ${envKey}`);
                }
                redisConfig[key as keyof typeof requiredEnvMap] =
                    key === 'port' ? parseInt(value, 10) : value;
            }

            // Initialize Redis client
            const redisClient = new Redis({
                host: redisConfig.host as string,
                port: redisConfig.port as number,
                maxRetriesPerRequest: null, // Disable retries for critical operations
                enableReadyCheck: true, // Ensure the client is ready before use
            });

            // Log successful connection
            redisClient.on('connect', () => {
                logger.info('Redis client connected!');
            });

            // Log errors
            redisClient.on('error', (err) => {
                logger.error(`Redis client error: ${err.message}`);
            });

            return redisClient;
        } catch (err) {
            logger.error(`Error initializing Redis client: ${err.message}`);
            throw err;
        }
    },
    inject: [], // No dependencies to inject
};