/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { IOptions } from 'etcd3';

export type EtcdModuleOptions = IOptions & { name?: string };

export interface EtcdOptionsFactory {
  createEtcdOptions(connectionName?: string): Promise<EtcdModuleOptions> | EtcdModuleOptions;
}

export interface EtcdModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<EtcdOptionsFactory>;
  useClass?: Type<EtcdOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<EtcdModuleOptions> | EtcdModuleOptions;
  inject?: any[];
}
