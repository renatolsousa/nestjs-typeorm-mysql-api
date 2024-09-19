import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healtCheck(): object {
    return {
      status: 'ok',
      message: 'API is running',
      version: (require('../package.json') as any).version,
      appName: (require('../package.json') as any).name,
    };
  }
}
