import { Controller, Get } from '@nestjs/common';

import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
   constructor(private service: CarsService,) {}

    @Get("/makes")
    async getMakes() {
        return this.service.getMakesOrModels("make");
    }

    @Get("/models")
    async getModels() {
        return this.service.getMakesOrModels("model");
    }
}
