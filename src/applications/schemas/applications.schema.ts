import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// Applications design schema
@Schema({ timestamps: true })
export class Application {
  @ApiProperty({
    example: 'Abdullah',
    description: 'Name of the applicant',
  })
  @Prop({ required: true, trim: true })
  name: string;

  @ApiProperty({
    example: 'Abdullahmmmaghrabi@gmail.com',
    description: 'Applicant email',
  })
  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @ApiProperty({
    example: {
      filename: 'AbdullahCv.pdf',
      path: '/uploads/AbdullahCv.pdf',
    },
    description: 'Uploaded resume file metadata',
  })
  @Prop({
    required: true,
    type: {
      filename: { type: String, required: true },
      path: { type: String, required: true },
    },
  })
  resume: {
    filename: string;
    path: string;
  };

  @ApiProperty({
    example: {
      filename: 'abdullah_image.png',
      path: '/uploads/abdullah_image.png',
    },
    description: 'Uploaded applicant image metadata',
  })
  @Prop({required: true,
 type: {
      filename: { type: String, required: true },
      path: { type: String, required: true },
    },
  })
  applicantImage: {
    filename: string;
    path: string;
  };

  @ApiProperty({
    example: '69273371b4ce7f9daa70957c',
    description: 'id of the job the applicant applied to',
  })
  @Prop({ required: true })
  jobId: string; 

  @ApiProperty({
    example: 'pending',
    enum: ['pending', 'accepted', 'rejected'],
    description: 'Current status of the application. default is (pending).',
  })
  @Prop({ default: 'pending', enum: ['pending', 'accepted', 'rejected'] })
  status: 'pending' | 'accepted' | 'rejected';
}

export type ApplicationDocument = Application & Document;
export const ApplicationSchema = SchemaFactory.createForClass(Application);
