/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
import { Module } from '@nestjs/common';
import { EtcdModule, EtcdModuleOptions, EtcdOptionsFactory } from '../../lib';
import { FeatureModule } from './feature/feature.module';

class ConfigService implements EtcdOptionsFactory {
  createEtcdOptions(): EtcdModuleOptions {
    return {
      hosts: `http://etcd0:2379`,
    };
  }
}

@Module({
  imports: [
    EtcdModule.forRootAsync({
      useClass: ConfigService,
    }),
    EtcdModule.forRoot({
      name: 'client_2',
      hosts: `http://etcd0:2379`,
    }),
    FeatureModule,
  ],
})
export class AsyncOptionsClassModule {}