import { Body, Controller, Post, Query, ValidationPipe } from '@nestjs/common';


import { SearchService } from './search.service';
import { SearchQueryDto } from './validation/search-query.dto';
import { SearchBodyDto } from './validation/search-body.dto';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @Post()
    async search(
        @Body() searchBody: SearchBodyDto,
        @Query(ValidationPipe) searchRequestQuery: SearchQueryDto
    ): Promise<any> {
        return this.searchService.search(searchBody, searchRequestQuery);
    }
}
