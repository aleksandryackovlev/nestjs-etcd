import { Server } from 'http';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ApplicationModule } from '../src/app.module';

describe('Etcd', () => {
  let server: Server;
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = module.createNestApplication();
    server = app.getHttpServer();
    await app.init();
  });

  it(`should return created entity`, async () => {
    await request(server)
      .post('/feature/default')
      .send({ key: 'client1_feature_key', value: 'client1_feture_value' })
      .expect(201, { key: 'client1_feature_key', value: 'client1_feture_value' });

    await request(server)
      .get('/feature/default/client1_feature_key')
      .expect(200, { key: 'client1_feature_key', value: 'client1_feture_value' });
  });

  afterEach(async () => {
    await app.close();
  });
});
