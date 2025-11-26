import {Controller,Patch,Delete, Post, Body, UseGuards, Req, ForbiddenException,Param,} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateJobsDto } from './dto/createJob.dto';
import { UpdateJobDto } from './dto/updateJop.dto';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService){}

// create the job post only business users are allowed and the user is logged in 
@UseGuards(AuthGuard('jwt'))
@Post()
async createJob(@Req() req: any, @Body() dto: CreateJobsDto) {
  const user = req.user; 

  // Check if user is business
  if (user.role !== 'business') {
    throw new ForbiddenException('Only business users can create jobs');
  }

  const ownerId = user.userId;  

  // Create the job in mongo using JobsService
  const newJob = await this.jobsService.createJob(dto, ownerId);

  return newJob;
}

@UseGuards(AuthGuard('jwt'))
@Patch(':id')
async updateJob(@Param('id') id: string,@Req() req:any, @Body() dto: UpdateJobDto){
    
    const user = req.user;

    if(user.role != "business"){
        throw new ForbiddenException("Only business users can update job posts");
    }

    const ownerId = user.userId
    const editJob = await this.jobsService.updateJob(id,ownerId, dto);
    return editJob;

}

@UseGuards(AuthGuard('jwt'))
@Delete(':id')
async deleteJob(@Param('id') id:string, @Req() req:any){
const user = req.user;

if(user.role != "business"){
    throw new ForbiddenException("Only business users can delete job posts");
  }
  const ownerId = user.userId
  const deleteJob = await this.jobsService.deleteJob(id,ownerId)
  return deleteJob

 }

}



