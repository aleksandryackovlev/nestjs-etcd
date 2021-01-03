import { Inject } from '@nestjs/common';
import { Etcd3 } from 'etcd3';

import { EtcdModuleOptions } from './interfaces';
import { getClientToken } from './etcd.utils';

export const InjectClient: (client?: Etcd3 | EtcdModuleOptions | string) => ParameterDecorator = (
  client?: Etcd3 | EtcdModuleOptions | string
) => Inject(getClientToken(client));
