import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import {Jobs, JobsSchema} from './schemas/job.schema'
import {MongooseModule} from '@nestjs/mongoose'

// This module sets everything needed for jobs.
@Module({
  imports: [MongooseModule.forFeature([{name: Jobs.name, schema: JobsSchema }])],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
