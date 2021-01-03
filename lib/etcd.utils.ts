/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/ban-types */
import { Type } from '@nestjs/common';
import { Etcd3 } from 'etcd3';

import { EtcdModuleOptions } from './interfaces';
import { DEFAULT_CLIENT_NAME } from './etcd.constants';

export function getClientToken(
  client: Etcd3 | EtcdModuleOptions | string = DEFAULT_CLIENT_NAME
): string | Function | Type<Etcd3> {
  return DEFAULT_CLIENT_NAME === client
    ? Etcd3
    : typeof client === 'string'
    ? `${client}EtcdClient`
    : client instanceof Etcd3 || DEFAULT_CLIENT_NAME === client.name || !client.name
    ? Etcd3
    : `${client.name}EtcdClient`;
}

export function getConnectionName(options: EtcdModuleOptions): string {
  return options && options.name ? options.name : DEFAULT_CLIENT_NAME;
}
