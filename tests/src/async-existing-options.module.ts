/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
import { Module } from '@nestjs/common';

import { EtcdModule, EtcdModuleOptions, EtcdOptionsFactory } from '../../lib';
import { FeatureModule } from './feature/feature.module';

class ConfigService implements EtcdOptionsFactory {
  createEtcdOptions(): EtcdModuleOptions {
    return {
      hosts: `http://0.0.0.0:2379`,
    };
  }
}

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
class ConfigModule {}

@Module({
  imports: [
    EtcdModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    EtcdModule.forRoot({
      name: 'client_2',
      hosts: `http://0.0.0.0:2381`,
    }),
    FeatureModule,
  ],
})
export class AsyncOptionsExistingModule {}
