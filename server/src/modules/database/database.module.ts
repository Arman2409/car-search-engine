import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Pool } from 'pg';

import { LoggerService } from '../../tools/logger.service';
import { DatabaseService } from './database.service';
import { DatabaseProvider, DATABASE_PROVIDER_KEY } from './database.provider';

@Module({
    imports: [ConfigModule],
    providers: [DatabaseService, DatabaseProvider, LoggerService],
    exports: [DatabaseService, DATABASE_PROVIDER_KEY],
})
export class DatabaseModule implements OnModuleInit {
    constructor(
        @Inject(DATABASE_PROVIDER_KEY) private readonly pool: Pool,
        private service: DatabaseService,
        private readonly logger: LoggerService,
    ) {}

    async onModuleInit() {
        await Promise.all([
            this.service.migrate(),
            this.service.seed(),
            this.service.index(),
        ]).catch((error) => {
            this.logger.error('Error initializing database module:', error);
        }).then(() => {
            this.logger.info('Database initialized successfully');
        }).finally(() => {
            this.pool.on('error', (err) => {
                this.logger.error('Unexpected error on idle client', err);
            });
        });
    }

    async onModuleDestroy() {
        await this.pool.end();
        this.logger.info('Disconnected from PostgreSQL');
    }
}