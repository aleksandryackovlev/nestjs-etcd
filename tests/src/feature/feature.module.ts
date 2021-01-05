import { Module } from '@nestjs/common';

import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';

import { FeatureControllerClient2 } from './feature.controller.client2';
import { FeatureServiceClient2 } from './feature.service.client2';

@Module({
  providers: [FeatureService, FeatureServiceClient2],
  controllers: [FeatureController, FeatureControllerClient2],
})
export class FeatureModule {}
