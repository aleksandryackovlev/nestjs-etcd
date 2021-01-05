import { Server } from 'http';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AsyncOptionsExistingModule } from '../src/async-existing-options.module';

describe('Etcd (async configuration)', () => {
  let server: Server;
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AsyncOptionsExistingModule],
    }).compile();

    app = module.createNestApplication();
    server = app.getHttpServer();
    await app.init();

    await request(server).delete('/feature/default');
    await request(server).delete('/feature/client2');
  });

  it('should create records in the given instance of etcd', async () => {
    await request(server)
      .post('/feature/default')
      .send({ key: 'client1_feature_key', value: 'client1_feture_value' })
      .expect(201, { key: 'client1_feature_key', value: 'client1_feture_value' });

    await request(server)
      .get('/feature/default/client1_feature_key')
      .expect(200, { key: 'client1_feature_key', value: 'client1_feture_value' });

    await request(server).get('/feature/client2/client1_feature_key').expect(404);
  });

  afterEach(async () => {
    await app.close();
  });
});
