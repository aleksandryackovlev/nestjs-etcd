import { Module } from '@nestjs/common';

import { EtcdModule } from '../../lib';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [
    FeatureModule.forRootAsync({
      useFactory: () => ({
        hosts: `http://etcd0:2379`,
      }),
    }),
    EtcdModule.forRoot({
      name: 'client_2',
      hosts: `http://etcd0:2379`,
    }),
    FeatureModule,
  ],
})
export class AsyncOptionsFactoryModule {}
