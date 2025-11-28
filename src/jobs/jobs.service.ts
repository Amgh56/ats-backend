import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobsDto } from './dto/createJob.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jobs } from './schemas/job.schema';
import { UpdateJobDto } from './dto/updateJop.dto';

// This service handles all the logic for creating, updating, and deleting jobs.
@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Jobs.name)
    private readonly jobModel: Model<Jobs>,
  ) {}
  
  // Creates a new job post and assigns it to the business user who owns it.
  async createJob(dto: CreateJobsDto, ownerId: string) {
    const job = new this.jobModel({
      ...dto,     
      ownerId,    
    });

    return job.save(); 
  }
  async updateJob(id: string, ownerId: string, dto: UpdateJobDto){
    const job = await this.jobModel.findById(id);

    if(!job){
        throw new NotFoundException("Job not found.");
    }

    if(job.ownerId != ownerId ){
        throw new ForbiddenException("You are not allowed to edit this job.");
    }

    Object.assign(job,dto);

  for (const key in dto) {
    if (dto[key] !== undefined) {
      (job as any)[key] = dto[key];
    }
  }

  // Updates an existing job post.
  // Checks if the job exists and ensures that only the owner can update it.
  // Applies the changes and returns the updated job.
  const updatedJob = await this.jobModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: false }
  );

  return {
    message: "Job updated successfully",
    job: updatedJob,
  };

  }

  // Deletes a job post.
  // Only the owner of the job is allowed to delete it.
  // Returns a confirmation message after successful deletion.
  async deleteJob(id: string, ownerId:string){
    const job = await this.jobModel.findById(id)

    if(!job){
        throw new NotFoundException("Job not found.");
    }

    if(job.ownerId != ownerId ){
        throw new ForbiddenException("You are not allowed to delete this job.");
    }
    await job.deleteOne()

    return{message: 'Job deleted successfully'}

  }

}
