import { DynamicModule, Module } from '@nestjs/common';

import { EtcdModuleOptions, EtcdModuleAsyncOptions } from './interfaces/etcd-options.interface';
import { EtcdCoreModule } from './etcd.core.module';

@Module({})
export class EtcdModule {
  static forRoot(options?: EtcdModuleOptions): DynamicModule {
    return {
      module: EtcdModule,
      imports: [EtcdCoreModule.forRoot(options)],
    };
  }

  static forRootAsync(options: EtcdModuleAsyncOptions): DynamicModule {
    return {
      module: EtcdModule,
      imports: [EtcdCoreModule.forRootAsync(options)],
    };
  }
}
