import { Module } from '@nestjs/common';

import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { DatabaseService } from '../database/database.service';
import { DatabaseProvider } from '../database/database.provider';

@Module({
  controllers: [CarsController],
  providers: [CarsService, DatabaseService, DatabaseProvider]
})
export class CarsModule { }
