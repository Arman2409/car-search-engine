import { Module } from '@nestjs/common';

import { LoggerService } from '../../tools/logger.service';
import { DatabaseService } from '../database/database.service';
import { DatabaseProvider } from '../database/database.provider';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService, DatabaseService, DatabaseProvider, LoggerService]
})
export class CarsModule { }
