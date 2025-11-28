import {Controller,Patch,Delete, Post, Body, UseGuards, Req, ForbiddenException,Param,} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateJobsDto } from './dto/createJob.dto';
import { UpdateJobDto } from './dto/updateJop.dto';
import {ApiTags,ApiOkResponse,ApiForbiddenResponse,ApiNotFoundResponse, ApiUnauthorizedResponse,ApiOperation,ApiCreatedResponse,ApiBody,ApiBearerAuth,ApiResponse,ApiParam,ApiExtraModels} from '@nestjs/swagger';
import { Jobs } from './schemas/job.schema';

// JobController handles everything related to job posts.
// it allows only business owners to post, update, edit, delette 
// and also consider ownership 
@ApiTags('Jobs')
@ApiExtraModels(Jobs)
@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService){}

// This function is responsible about creating a job
// it makes sure the user creating a job is logged in.
// and that his role is buisness
@UseGuards(AuthGuard('jwt'))
@Post()
@ApiBearerAuth()
@ApiOperation({ summary: 'Create a new job post Business users only are allowed to create one' ,description: 'How to test this endpoint in Swagger:\n' +
'1. Register a business user using POST /auth/register.\n' +
'2. Login using POST /auth/login and copy the access_token.\n' +
'3. Click the "Authorize" button in Swagger and enter: Bearer <token>.\n' +
'4. Call this POST /jobs endpoint to create a job.',})
@ApiBody({
  type: CreateJobsDto,
  description: 'Job details required to create a job post.',
})
@ApiCreatedResponse({ description: 'Job created successfully.',
  schema: {
    example: {
      _id: "6730dfc14a07cf5ae14df100",
      title: "Backend Developer",
      description: "Develop backend APIs using NestJS",
      salary: 15000,
      location: "Riyadh",
      ownerId: "6730dd1c4a07cf5ae14de5f2",
      createdAt: "2025-11-27T19:22:14.120Z",
      updatedAt: "2025-11-27T19:22:14.120Z",
    }
  }
})
@ApiUnauthorizedResponse({
  description: 'Unauthorized - Missing or invalid JWT token',
  schema: {
    example: {
      statusCode: 401,
      message: "Unauthorized",
      error: "Unauthorized"
    }
  }
})
@ApiForbiddenResponse({
  description: 'Forbidden - Only business users can create jobs',
  schema: {
    example: {
      statusCode: 403,
      message: "Only business users can create jobs.",
      error: "Forbidden"
    }
  }
})
async createJob(@Req() req: any, @Body() dto: CreateJobsDto) {
  const user = req.user; 

  if (user.role !== 'business') {
    throw new ForbiddenException('Only business users can create jobs');
  }

  const ownerId = user.userId;  

  const newJob = await this.jobsService.createJob(dto, ownerId);

  return newJob;
}

// This function is responsible about updating jobs
// its first checks that the user is logged in 
// and that the job he is updating belongs to the same user by checking job owner id and user id returned from the jwt signature 
@UseGuards(AuthGuard('jwt'))
@Patch(':id')
@ApiBearerAuth()
@ApiOperation({
  summary: 'Update an existing job post (job owner only)',
  description:
    'How to test this endpoint:\n' +
    '1. Login as a business user.\n' +
    '2. Copy your access_token and click "Authorize" in Swagger.\n' +
    '3. Only the owner of the job can update it.\n' +
    '4. Provide the job Id in the URL and the updated fields in the body.',
})
@ApiParam({
  name: 'id',
  example: '6730dfc14a07cf5ae14df100',
  description: 'The id of the job you want to update',
})
@ApiBody({
  type: UpdateJobDto,
  description: 'Fields you want to update. All fields are optional.',
})
@ApiOkResponse({
  description: 'Job updated successfully',
  schema: {
    example: {
      message: "Job updated successfully",
      job: {
        _id: "6730dfc14a07cf5ae14df100",
        title: "Updated Job Title",
        description: "Updated description",
        salary: 18000,
        location: "Jeddah",
        ownerId: "6730dd1c4a07cf5ae14de5f2",
        createdAt: "2025-11-27T19:22:14.120Z",
        updatedAt: "2025-11-27T20:10:55.553Z"
      }
    }
  }
})
@ApiUnauthorizedResponse({
  description: 'Unauthorized - Missing or invalid JWT token',
  schema: {
    example: {
      statusCode: 401,
      message: "Unauthorized",
      error: "Unauthorized"
    }
  }
})
@ApiForbiddenResponse({
  description: 'Forbidden - Only the job owner can update this job',
  schema: {
    example: {
      statusCode: 403,
      message: "You are not allowed to edit this job.",
      error: "Forbidden"
    }
  }
})
@ApiNotFoundResponse({
  description: 'Job not found',
  schema: {
    example: {
      statusCode: 404,
      message: "Job not found.",
      error: "Not Found"
    }
  }
})
async updateJob(@Param('id') id: string,@Req() req:any, @Body() dto: UpdateJobDto){
    
    const user = req.user;

    if(user.role != "business"){
        throw new ForbiddenException("Only business users can update job posts");
    }

    const ownerId = user.userId
    const editJob = await this.jobsService.updateJob(id,ownerId, dto);
    return editJob;

}


// This function is responsible about deleting the job 
// it checks that the user is logged in and the job belongs to the user welling to delete
@UseGuards(AuthGuard('jwt'))
@Delete(':id')
@ApiBearerAuth()
@ApiOperation({
  summary: 'Delete a job post (job owner only)',
  description:
    'How to test this endpoint:\n' +
    '1. Login as a business user.\n' +
    '2. Copy the access_token returned from /auth/login.\n' +
    '3. Click "Authorize" in Swagger and paste: Bearer <token>.\n' +
    '4. Only the owner of the job can delete it.\n' +
    '5. Provide the job Id in the URL.',
})
@ApiParam({name: 'id',
  example: '6730dfc14a07cf5ae14df100',
  description: 'The id of the job you want to delete',
})
@ApiOkResponse({description: 'Job deleted successfully',
  schema: {
    example: {
      message: 'Job deleted successfully'
    }
  }
})
@ApiUnauthorizedResponse({description: 'Unauthorized - Missing or invalid JWT token',
  schema: {
    example: {
      statusCode: 401,
      message: 'Unauthorized',
      error: 'Unauthorized'
    }
  }
})
@ApiForbiddenResponse({description: 'Forbidden - Only the job owner can delete this job',
  schema: {
    example: {
      statusCode: 403,
      message: 'You are not allowed to delete this job.',
      error: 'Forbidden'
    }
  }
})
@ApiNotFoundResponse({ description: 'Job not found',
  schema: {
    example: {
      statusCode: 404,
      message: 'Job not found.',
      error: 'Not Found'
    }
  }
})
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



