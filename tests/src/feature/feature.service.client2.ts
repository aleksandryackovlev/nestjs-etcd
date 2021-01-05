import { Injectable, NotFoundException } from '@nestjs/common';
import { Etcd3 } from 'etcd3';

import { InjectClient } from '../../../lib';

import { Feature } from './feature.entity';

@Injectable()
export class FeatureServiceClient2 {
  constructor(@InjectClient('client_2') private readonly client: Etcd3) {}

  async find(key: string): Promise<Feature> {
    const value = await this.client.get(key).string();

    if (!value) {
      throw new NotFoundException();
    }

    return { key, value };
  }

  async findAll(): Promise<Feature[]> {
    const featuresValues = await this.client.getAll().strings();

    return Object.keys(featuresValues).map((key) => ({
      key,
      value: featuresValues[key],
    }));
  }

  async create(feature: Feature): Promise<Feature> {
    await this.client.put(feature.key).value(feature.value);

    return feature;
  }

  async delete(): Promise<void> {
    await this.client.delete().all();
  }
}
