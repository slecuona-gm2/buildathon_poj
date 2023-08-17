import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { CreateInfoRequestDto } from './dto/create-info-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('infoRequest')
  async createInfoRequest(@Body() body: CreateInfoRequestDto): Promise<string> {
    return this.appService.createInfoRequest(body);
  }

}
