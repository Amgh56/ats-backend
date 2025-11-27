import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsIn(['accepted', 'rejected'])
  status: 'accepted' | 'rejected';
}