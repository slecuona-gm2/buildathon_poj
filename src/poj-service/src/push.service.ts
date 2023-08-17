import { Injectable } from '@nestjs/common';
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { config } from './config';

@Injectable()
export class PushService {
  constructor() { }

  getSigner() {
    const PK = config.PUSH_CHANNEL_PK;
    const Pkey = `0x${PK}`;
    return new ethers.Wallet(Pkey);
  }

  async sendNotification(taxId: string): Promise<any> {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer: this.getSigner(),
        type: 1, // broadcast
        identityType: 2, // direct payload
        notification: {
          title: `PoJ: New information request!`,
          body: `[Company] sends you a request to share your employment information.`
        },
        payload: {
          title: `PoJ: New information request!`,
          body: `[Company] sends you a request to share your employment information.`,
          cta: '',
          img: ''
        },
        channel: config.PUSH_CHANNEL_ADDRESS,
        env: 'staging'
      });
    } catch (err) {
      console.error('Error: ', err);
    }
  }
}
