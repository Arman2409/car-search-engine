import { Module } from '@nestjs/common';

import { LoggerService } from '../../tools/logger.service';
import { DatabaseService } from '../database/database.service';
import { DatabaseProvider } from '../database/database.provider';
import { CacheService } from '../cache/cache.service';
import { CacheProvider } from '../cache/cache.provider';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';


@Module({
  controllers: [CarsController],
  providers: [CarsService, DatabaseService, DatabaseProvider, LoggerService, CacheService, CacheProvider]
})
export class CarsModule { }
