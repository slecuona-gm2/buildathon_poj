import { Injectable } from '@nestjs/common';
import { CreateOobInvitationDto } from './dto/create-oob-invitation.dto';
import { GoalCode } from '@extrimian/waci';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserInvitation,
  UserInvitationDocument,
} from './schemas/citizen-invitation.schema';
import { Model } from 'mongoose';
import axios from 'axios';
import * as qrcode from 'qrcode';
import {
  CredentialContext,
  CredentialContextDocument,
} from './schemas/credential-context.schema';
import { GetVcDataDto } from './dto/get-vc-data.dto';
import { config } from './config';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(UserInvitation.name)
    private userInvitationModel: Model<UserInvitationDocument>,
    @InjectModel(CredentialContext.name)
    private credentialContextModel: Model<CredentialContextDocument>,
  ) {}

  async onModuleInit(): Promise<void> {
    const contexts: CredentialContext[] = [
      {
        _id: 'employment-card',
        name: 'PoJ Employment Card',
        vcInfo: {
          issuer: 'Anses',
          types: ['VerifiableCredential', 'EmploymentCredential'],
        },
        contexts: [
          'https://json-ld.org/contexts/person.jsonld',
          'https://w3id.org/citizenship/v1',
          'https://w3id.org/security/bbs/v1',
          'https://www.w3.org/2018/credentials/v1',
          'https://schema.org/EmployeeRole'
        ],
        mappingRulesDescriptor: {
          type: 'type',
          id: 'id',
          givenName: 'givenName',
          familyName: 'familyName',
          birthDate: 'birthDate',
          email: 'email',
          telephone: 'telephone',
          'nationality:name': 'nationality',
        },
        subjectMetadata: {
          type: ['PermanentResident', 'Person', 'Employee'],
        },
        dataProvider: {
          url: 'http://host.docker.internal:3600/users/:userId',
          urlKey: ':userId',
        },
      },
    ];

    await this.credentialContextModel.bulkWrite(
      contexts.map(({ _id, ...attributes }: any) => ({
        updateOne: {
          filter: { _id },
          update: { $set: attributes },
          upsert: true,
        },
      })) as any,
      { ordered: false },
    );
  }

  async getVcData(waciInvitationId: string): Promise<GetVcDataDto> {
    const { userId, credentialContextIds } =
      await this.userInvitationModel.findOne({
        waciInvitationId,
      });

    return Promise.all(
      credentialContextIds.map(async (credentialContextId) => {
        const {
          contexts,
          mappingRulesDescriptor,
          vcInfo,
          subjectMetadata,
          dataProvider,
        } = await this.credentialContextModel.findById(credentialContextId);
        const { data: subjectData } = await axios.get(
          dataProvider.url.replace(dataProvider.urlKey, userId),
        );

        return {
          contexts,
          vcInfo,
          data: { ...subjectData, ...subjectMetadata },
          mappingRulesDescriptor,
        };
      }),
    );
  }

  async getQRInvitation(dto: CreateOobInvitationDto): Promise<string> {
    return qrcode.toDataURL(await this.getDeeplinkInvitation(dto));
  }

  async getDeeplinkInvitation(dto: CreateOobInvitationDto): Promise<string> {
    const { encodedInvitation, id } = await this.getEncodedInvitationMessage(
      dto.goalCode,
    );

    await new this.userInvitationModel({
      waciInvitationId: id,
      userId: dto.userId,
      credentialContextIds: dto.credentialContextIds,
    }).save();

    return `${config.DEEPLINK_SCHEMA}?_oob=${encodedInvitation}`;
  }

  private async getEncodedInvitationMessage(
    goalCode: GoalCode,
  ): Promise<{ id: string; encodedInvitation: string }> {
    const { data: invitationMessage } = await axios.post(
      config.WACI_INVITATION_ENDPOINT_URL,
      {
        goalCode,
      },
    );
    return {
      id: invitationMessage.id,
      encodedInvitation: Buffer.from(
        JSON.stringify(invitationMessage),
      ).toString('base64'),
    };
  }
}
