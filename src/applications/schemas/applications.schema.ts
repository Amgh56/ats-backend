import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Application {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

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

  @Prop({ required: true })
  jobId: string; 

  @Prop({ default: 'pending', enum: ['pending', 'accepted', 'rejected'] })
  status: 'pending' | 'accepted' | 'rejected';
}

export type ApplicationDocument = Application & Document;
export const ApplicationSchema = SchemaFactory.createForClass(Application);
