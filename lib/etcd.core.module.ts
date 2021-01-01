import { DynamicModule, Module, Provider, Type, Global } from '@nestjs/common';
import { Etcd3 } from 'etcd3';

import {
  EtcdModuleAsyncOptions,
  EtcdModuleOptions,
  EtcdOptionsFactory,
} from './interfaces/etcd-options.interface';

import { ETCD_CONNECTION, ETCD_MODULE_OPTIONS } from './etcd.constants';

@Global()
@Module({})
export class EtcdCoreModule {
  static forRoot(options: EtcdModuleOptions = { hosts: '127.0.0.1:2379' }): DynamicModule {
    const etcdModuleOptions = {
      provide: ETCD_MODULE_OPTIONS,
      useValue: options,
    };

    const connectionProvider = {
      provide: ETCD_CONNECTION,
      useValue: new Etcd3(options),
    };

    return {
      module: EtcdCoreModule,
      providers: [connectionProvider, etcdModuleOptions],
      exports: [connectionProvider],
    };
  }

  static forRootAsync(options: EtcdModuleAsyncOptions): DynamicModule {
    const connectionProvider = {
      provide: ETCD_CONNECTION,
      useFactory: (etcdOptions: EtcdModuleOptions) => {
        return new Etcd3(etcdOptions);
      },
      inject: [ETCD_MODULE_OPTIONS],
    };

    const asyncProviders = this.createAsyncProviders(options);

    return {
      module: EtcdCoreModule,
      imports: options.imports,
      providers: [...asyncProviders, connectionProvider],
      exports: [connectionProvider],
    };
  }

  private static createAsyncProviders(options: EtcdModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<EtcdOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: EtcdModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: ETCD_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [(options.useClass || options.useExisting) as Type<EtcdOptionsFactory>];
    return {
      provide: ETCD_MODULE_OPTIONS,
      useFactory: (optionsFactory: EtcdOptionsFactory) =>
        optionsFactory.createEtcdOptions(options.name),
      inject,
    };
  }
}
