import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInfoRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  taxId: string;
}
