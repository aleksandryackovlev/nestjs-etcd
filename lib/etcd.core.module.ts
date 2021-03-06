import { DynamicModule, Module, Provider, Type, Global } from '@nestjs/common';
import { Etcd3, IOptions } from 'etcd3';

import {
  EtcdModuleAsyncOptions,
  EtcdModuleOptions,
  EtcdOptionsFactory,
} from './interfaces/etcd-options.interface';

import { getClientToken } from './etcd.utils';

import { ETCD_MODULE_OPTIONS } from './etcd.constants';

@Global()
@Module({})
export class EtcdCoreModule {
  static forRoot(options: EtcdModuleOptions = { hosts: '127.0.0.1:2379' }): DynamicModule {
    const etcdModuleOptions = {
      provide: ETCD_MODULE_OPTIONS,
      useValue: options,
    };

    const client = new Etcd3(options as IOptions);

    const connectionProvider = {
      provide: getClientToken(options) as string,
      useValue: options.namespace ? client.namespace(options.namespace) : client,
    };

    return {
      module: EtcdCoreModule,
      providers: [connectionProvider, etcdModuleOptions],
      exports: [connectionProvider],
    };
  }

  static forRootAsync(options: EtcdModuleAsyncOptions): DynamicModule {
    const connectionProvider = {
      provide: getClientToken(options as EtcdModuleOptions) as string,
      useFactory: (etcdOptions: EtcdModuleOptions) => {
        const client = new Etcd3(etcdOptions as IOptions);

        return etcdOptions.namespace ? client.namespace(etcdOptions.namespace) : client;
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
