import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { SearchModule } from './modules/search/search.module';
import { DatabaseService } from './modules/database/database.service';
import { DatabaseModule } from './modules/database/database.module';
import { CarsModule } from './modules/cars/cars.module';
import { LoggerService } from './tools/logger.service';

@Module({
  imports: [SearchModule, DatabaseModule, ConfigModule.forRoot(), CarsModule],
  controllers: [AppController],
  providers: [DatabaseService, LoggerService],
})
export class AppModule {}
