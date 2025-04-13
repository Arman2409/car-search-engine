import { Module } from '@nestjs/common';

import { LoggerService } from '../../tools/logger.service';
import { DatabaseService } from '../database/database.service';
import { DatabaseProvider } from '../database/database.provider';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';


@Module({
    providers: [SearchService, DatabaseService, DatabaseProvider, LoggerService],
    controllers: [SearchController]
})
export class SearchModule { }
