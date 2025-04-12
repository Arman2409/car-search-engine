import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

import { DatabaseService } from './database.service';


const databasePoolProvider = {
    provide: 'DATABASE_POOL', // A unique token to identify this provider
    useFactory: async () => {
        const pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT || '5432', 10),
            max: 20, // Maximum number of clients in the pool
            idleTimeoutMillis: 30000, // How long a client can remain idle before being closed
            connectionTimeoutMillis: 2000, // How long to wait for a connection establishment
        });

        try {
            await pool.connect();
            console.log('Database connected!');
            return pool;
        } catch (err) {
            console.error('Error connecting to database pool:', err);
            throw err;
        }
    },
    inject: [], 
};


@Module({
    imports: [ConfigModule],
    providers: [DatabaseService, databasePoolProvider],
    exports: [DatabaseService, 'DATABASE_POOL'],
})
export class DatabaseModule implements OnModuleInit {
    constructor(
        @Inject('DATABASE_POOL') private readonly pool: Pool,
        private configService: ConfigService,
        private service: DatabaseService,
    ) {
        this.pool = new Pool({
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            user: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
        });
    }

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