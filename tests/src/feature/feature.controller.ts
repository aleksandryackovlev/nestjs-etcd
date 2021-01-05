import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';

import { FeatureService } from './feature.service';
import { Feature } from './feature.entity';

@Controller('feature/default')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

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
