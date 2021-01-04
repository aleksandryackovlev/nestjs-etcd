import { DynamicModule, Module } from '@nestjs/common';
import { EtcdModule } from '../../lib';

@Module({})
export class DatabaseModule {
  static async forRoot(): Promise<DynamicModule> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      module: DatabaseModule,
      imports: [
        EtcdModule.forRoot({
          hosts: `http://etcd0:2379`,
        }),
        EtcdModule.forRoot({
          name: 'client_2',
          hosts: `http://etcd0:2379`,
        }),
      ],
    };
  }
}
