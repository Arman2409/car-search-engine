import { Controller, Get } from '@nestjs/common';

import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
   constructor(private service: CarsService,) {}

    @Get("/makes")
    async getMakes() {
        return this.service.getFilterData("makes");
    }

    @Get("/models")
    async getModels() {
        return this.service.getFilterData("models");
    }

    @Get("/bodyTypes")
    async getBodyTypes() {
        return this.service.getFilterData("bodyTypes");
    }
}
