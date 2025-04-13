import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import { DatabaseService } from '../database/database.service';
import { SearchBodyDto } from './validation/search-body.dto';
import { SearchQueryDto } from './validation/search-query.dto';
import { CarSearchCriteria } from '../../types/modules/search';

@Injectable()
export class SearchService {
    constructor(
        private readonly database: DatabaseService
    ) { }

    async search(
        searchBody: SearchBodyDto,
        searchRequestQuery: SearchQueryDto
    ) {
        const { page, size } = { ...searchRequestQuery };
        const { year, body_type, name } = { ...searchBody };

        const criteria: CarSearchCriteria = {
            size,
            page,
            name,
            year,
            body_type
        }

        const result = await this.database.searchCars(criteria);

        return result;
    }

}
