import { Module } from '@nestjs/common';
import { EtcdModule } from '../../lib';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [
    EtcdModule.forRoot({
      hosts: `http://0.0.0.0:2379`,
    }),
    FeatureModule,
    EtcdModule.forRoot({
      name: 'client_2',
      hosts: `http://0.0.0.0:2381`,
    }),
  ],
})
export class ApplicationModule {}
