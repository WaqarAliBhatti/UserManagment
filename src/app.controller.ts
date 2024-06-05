import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Check App')
@Controller('Check-App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Check if App is Offline' })
  @ApiResponse({ status: 200, description: 'App is running' })
  getHello(): string {
    return this.appService.getHello();
  }
}
