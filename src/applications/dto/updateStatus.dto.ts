import { IsIn, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Used to update an user application status.
export class UpdateStatusDto {
  @ApiProperty({
        example: 'accepted',
        description: 'Applicant new status either (acceoted or rejected)".',
        enum: ['accepted', 'rejected'],
      })
  @IsNotEmpty()
  @IsIn(['accepted', 'rejected'])
  status: 'accepted' | 'rejected';
}