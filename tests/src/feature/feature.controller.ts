import { Controller, Get, Post, Body } from '@nestjs/common';

import { FeatureService } from './feature.service';
import { Feature } from './feature.entity';

@Controller('feature/default')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Get()
  find(key: string): Promise<Feature> {
    return this.featureService.find(key);
  }

  @Get()
  findAll(): Promise<Feature> {
    return this.featureService.findAll();
  }

  @Post()
  create(@Body() feature: Feature): Promise<Feature> {
    return this.featureService.create(feature);
  }
}
