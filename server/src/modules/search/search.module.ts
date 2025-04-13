import { Module } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { DatabaseProvider } from '../database/database.provider';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';


@Module({
    providers: [SearchService, DatabaseService, DatabaseProvider],
    controllers: [SearchController]
})
export class SearchModule { }
