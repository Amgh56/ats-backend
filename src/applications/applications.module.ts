import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationSchema,Application } from './schemas/applications.schema';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';
import { Jobs, JobsSchema } from '../jobs/schemas/job.schema';

@Module({
  imports: [MulterModule.register(multerConfig),MongooseModule.forFeature([{name: Application.name, 
    schema: ApplicationSchema},{ name: Jobs.name, schema: JobsSchema }])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService]
})
export class ApplicationsModule {}
