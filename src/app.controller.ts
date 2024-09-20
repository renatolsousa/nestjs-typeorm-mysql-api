import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Default Routes')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): object {
    return {
      access: 'denied'
    };
  }
  
  @Get('health')
  getHello(): object {
    return this.appService.healtCheck();
  }
}
