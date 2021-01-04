import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [DatabaseModule.forRoot(), FeatureModule],
})
export class AsyncApplicationModule {}
