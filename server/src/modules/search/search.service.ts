import { HttpCode, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { isErrorResult } from '../../types/type-guards';
import { DatabaseService } from '../database/database.service';
import { SearchBodyDto } from './validation/search-body.dto';
import { SearchQueryDto } from './validation/search-query.dto';
import { CarSearchCriteria } from '../../types/modules/search';
import type { ErrorResult } from '../../types/global';


@Injectable()
export class SearchService {
    constructor(
        private readonly database: DatabaseService
    ) { }

    @HttpCode(HttpStatus.OK)
    async search(
        searchBody: SearchBodyDto,
        searchRequestQuery: SearchQueryDto
    ) {
        const { page, size } = { ...searchRequestQuery };
        const { name, make, model, year, body_type,  } = { ...searchBody };

        const criteria: CarSearchCriteria = {
            make,
            model,
            size,
            page,
            name,
            year,
            body_type, 
           
        }

        const result = await this.database.searchCars(criteria);

        if (isErrorResult(result)) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }

        return result;
    }

}
