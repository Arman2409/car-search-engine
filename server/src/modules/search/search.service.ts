import { HttpCode, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { isErrorResult } from '../../utils/type-guards';
import { DatabaseService } from '../database/database.service';
import { SearchBodyDto } from './validation/search-body.dto';
import { SearchQueryDto } from './validation/search-query.dto';
import type { CarSearchCriteria } from '../../types/modules/search';


@Injectable()
export class SearchService {
    constructor(
        private readonly database: DatabaseService
    ) { }

    async search(
        searchBody: SearchBodyDto,
        searchRequestQuery: SearchQueryDto
    ) {
        const criteria: CarSearchCriteria = {
            ...searchRequestQuery,
            ...searchBody,
        }

        const result = await this.database.searchCars(criteria);

        console.log({result});
        
        if (isErrorResult(result)) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }

        return result;
    }

}
