import { Module, OnModuleInit } from '@nestjs/common';

import { LoggerService } from '../../tools/logger.service';
import { CacheService } from './cache.service';
import { CacheProvider } from './cache.provider';


@Module({
  providers: [CacheService, CacheProvider, LoggerService],
})
export class CacheModule implements OnModuleInit  {
   constructor(
          private readonly logger: LoggerService,
      ) {}

      onModuleInit() {
          this.logger.info('Cache initialized successfully');
      }
}
