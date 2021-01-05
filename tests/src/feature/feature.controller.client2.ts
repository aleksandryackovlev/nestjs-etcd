import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';

import { FeatureServiceClient2 } from './feature.service.client2';
import { Feature } from './feature.entity';

@Controller('feature/client2')
export class FeatureControllerClient2 {
  constructor(private readonly featureService: FeatureServiceClient2) {}

  @Get(':id')
  find(@Param('id') key: string): Promise<Feature> {
    return this.featureService.find(key);
  }

  @Get()
  findAll(): Promise<Feature[]> {
    return this.featureService.findAll();
  }

  @Post()
  create(@Body() feature: Feature): Promise<Feature> {
    return this.featureService.create(feature);
  }

  @Delete()
  delete(): Promise<void> {
    return this.featureService.delete();
  }
}
