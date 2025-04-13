import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { isErrorResult } from '../../types/type-guards';
import { DatabaseService } from '../database/database.service';
import type { ErrorResult } from '../../types/global';

@Injectable()
export class CarsService {
    constructor(private readonly database: DatabaseService) { }

    @HttpCode(HttpStatus.OK)
    async getMakesOrModels(type: "model" | "make") {
        const result = await this.database.getUniqueModelsOrMakes(type);

        if (isErrorResult(result)) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return result;
    }
}
