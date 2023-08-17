import { Injectable } from '@nestjs/common';

@Injectable()
export class AnsesService {
  constructor() {}

  async getEmployeeData(taxId: string): Promise<any> {
    return null;
  }
}
