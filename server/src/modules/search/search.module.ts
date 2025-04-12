import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { DatabaseService } from '../database/database.service';
import { databasePoolProvider } from '../database/database.module';

@Module({
    providers: [SearchService, DatabaseService, databasePoolProvider],
    controllers: [SearchController]
})
export class SearchModule {}
