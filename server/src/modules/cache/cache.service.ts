import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

import { CACHE_CLIENT_KEY } from './cache.provider';

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_CLIENT_KEY) private readonly redisClient: Redis,
    ) {}

    async get(key: string): Promise<string | null> {
        return this.redisClient.get(key);
    }

    async set(key: string, value: string, ttlInSeconds?: number): Promise<void> {
        if (ttlInSeconds) {
            await this.redisClient.setex(key, ttlInSeconds, value);
        } else {
            await this.redisClient.set(key, value);
        }
    }

    async del(key: string): Promise<void> {
        await this.redisClient.del(key);
    }
}