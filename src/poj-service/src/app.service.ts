import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PushService } from './push.service';
import { InfoRequestDocument } from './schemas/info-request.schema'
import { CreateInfoRequestDto } from './dto/create-info-request.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel()
    private infoRequestModel: Model<InfoRequestDocument>,
    private pushService: PushService,
  ) { }

  async createInfoRequest(dto: CreateInfoRequestDto): Promise<any> {

    await new this.infoRequestModel({
      companyId: 1,
      status: 'pending',
      taxId: dto.taxId,
      user: dto.userId
    }).save();

    this.pushService.sendNotification(dto.taxId);

    return null;
  }
}
