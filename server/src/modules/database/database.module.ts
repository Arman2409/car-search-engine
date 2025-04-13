import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

import { DatabaseService } from './database.service';
import { DatabaseProvider, DATABASE_PROVIDER_KEY } from './database.provider';

@Module({
    imports: [ConfigModule],
    providers: [DatabaseService, DatabaseProvider],
    exports: [DatabaseService, DATABASE_PROVIDER_KEY],
})
export class DatabaseModule implements OnModuleInit {
    constructor(
        @Inject(DATABASE_PROVIDER_KEY) private readonly pool: Pool,
        private service: DatabaseService,
    ) {}

    async onModuleInit() {
        await Promise.all([
            this.service.migrate(),
            this.service.seed(),
            this.service.index(),
        ]).catch((error) => {
            console.error('Error initializing database module:', error);
        }).then(() => {
            console.log('Database initialized successfully');
        }).finally(() => {
            this.pool.on('error', (err) => {
                console.error('Unexpected error on idle client', err);
            });
        });
    }


    async onModuleDestroy() {
        await this.pool.end();
        console.log('Disconnected from PostgreSQL');
    }
}