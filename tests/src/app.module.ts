import { Module } from '@nestjs/common';
import { EtcdModule } from '../../lib';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [
    EtcdModule.forRoot({
      hosts: `http://etcd0:2379`,
    }),
    FeatureModule,
    EtcdModule.forRoot({
      name: 'client_2',
      hosts: `http://etcd0:2379`,
    }),
  ],
})
export class ApplicationModule {}
