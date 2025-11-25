import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // class where we will request and response to http
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
