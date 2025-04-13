import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { isErrorResult } from '../../utils/type-guards';
import { LoggerService } from '../../tools/logger.service';
import { DatabaseService } from '../database/database.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CarsService {
    constructor(
        private readonly database: DatabaseService,
        private readonly cache: CacheService,
        private readonly logger: LoggerService,
    ) { }

    @HttpCode(HttpStatus.OK)
    async getMakesOrModels(type: "model" | "make") {

        const cachedResult = await this.cache.get(type)
            .then(result => result)
            .catch((err) => {
                this.logger.error('Error fetching from cache', err);
            });

        if (cachedResult) {
            return JSON.parse(cachedResult);
        }

        const result = await this.database.getUniqueModelsOrMakes(type);

        if (isErrorResult(result)) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR);
        }

        this.cache.set(type, JSON.stringify(result), 3600)
            .catch((err) => {
                this.logger.error('Error setting cache', err);
            })

        return result;
    }
}
