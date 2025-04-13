import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class CarsService {
    constructor(private readonly database: DatabaseService) {}

    async getMakesOrModels(type: "model" | "make") {
        const result = await this.database.getUniqueModelsOrMakes(type);

        return result;
    }
}
