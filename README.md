<div align="center">
  <a href="https://etcd.io/">
    <img src="https://raw.githubusercontent.com/cncf/artwork/master/projects/etcd/horizontal/color/etcd-horizontal-color.png" alt="Etcd logo" width="260">
  </a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="280" alt="Nest Logo" /></a>
</div>

[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![Build Status](https://github.com/aleksandryackovlev/nestjs-etcd/workflows/build/badge.svg)](https://github.com/aleksandryackovlev/nestjs-etcd/actions)
[![codecov](https://codecov.io/gh/aleksandryackovlev/nestjs-etcd/branch/main/graph/badge.svg)](https://codecov.io/gh/aleksandryackovlev/nestjs-etcd)
[![size](https://packagephobia.now.sh/badge?p=nestjs-etcd)](https://packagephobia.now.sh/result?p=nestjs-etcd)

## Description

[Etcd3](https://github.com/microsoft/etcd3) module for [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm i --save nestjs-etcd
```

### Getting Started
To register the EtcdModule in `app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { EtcdModule} from 'nestjs-etcd';

@Module({
    imports: [
        EtcdModule.forRoot({
            name: 'client_name', // optional, default to 'default'
            hosts: `http://0.0.0.0:2379`,
        }),
    ],
})
export class AppModule {}
```
With Async
```typescript
import { Module } from '@nestjs/common';
import { EtcdModule} from 'nestjs-etcd';

@Module({
    imports: [
        EtcdModule.forRootAsync({
                name: 'client_name', // optional, default to 'default'
                useFactory: (configService: ConfigService) => ({
                hosts: configService.get('hosts'),
            }),
            inject:[ConfigService],
        }),
    ],
})
export class AppModule {}
```
Module supports all the options for [Etcd3](https://www.npmjs.com/package/etcd3) package (see https://microsoft.github.io/etcd3/interfaces/ioptions.html):
```typescript
type EtcdModuleOptions = IOptions & { name?: string }
```
### Usage
```typescript
import { Injectable } from '@nestjs/common';
import { Etcd3 } from 'etcd3';
import { InjectClient } from 'nestjs-etcd';

@Injectable()
export class TestService {
    // client_name is optional for InjectClient, default to 'default'
    constructor(@InjectClient('client_name') private readonly client: Etcd3) {}
    
    find(key: string): Promise<string> {
        return this.client.get(key).string();
    }
}
```
## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/nestjs-etcd.svg
[npm-url]: https://npmjs.com/package/nestjs-etcd
[deps]: https://david-dm.org/aleksandryackovlev/nestjs-etcd.svg
[deps-url]: https://david-dm.org/aleksandryackovlev/nestjs-etcd
