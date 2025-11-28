import { Controller,Post,Body,UploadedFiles,UseInterceptors,UseGuards,Get,Param,Req,Patch} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateApplicationDto } from './dto/applications.dto';
import {ApplicationsService} from './applications.service'
import { AuthGuard } from '@nestjs/passport';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import { ApiNotFoundResponse,ApiForbiddenResponse,ApiOkResponse,ApiTags,ApiBadRequestResponse,ApiCreatedResponse,ApiOperation,ApiUnauthorizedResponse,ApiResponse,ApiBearerAuth,ApiConsumes,ApiBody,ApiParam,  ApiExtraModels, } from '@nestjs/swagger';
import { Application } from './schemas/applications.schema';

// This route is responsible for job applications. 
@ApiTags('Applications')
@ApiExtraModels(Application)
@ApiExtraModels(CreateApplicationDto)
@Controller('applications')
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService){}

    // Handles job applications submitted by talents.
    // Accepts resume (PDF) and applicant image (PNG).
    @Post()
    @ApiOperation({
        summary: 'Submit a job application with resume and applicant image',
        description:
        'How to use this endpoint:\n' +
        '1. Fill the fields: name, email, and jobId.\n' +
        '2. Upload your resume as a PDF file in the "resume" field.\n' +
        '3. Upload your applicant image as a PNG file in the "applicantImage" field.\n' +
        '4. Click "Execute" to submit the application.\n' +
        'Note \n' +
        '- You get the jobid from the job you created with beside _id  it will be something  similar to this (692737828b2fa163082e938c) \n' +
        '- You can find the pdf you uploaded and image in vs code under the /upload folder'
        ,
      })
      @ApiConsumes('multipart/form-data')
      @ApiBody({
        description: 'Application payload including required files',
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Abdullah' },
            email: { type: 'string', example: 'AbdullahHaitham@gmail.com' },
            jobId: { type: 'string', example: '6730dfc14a07cf5ae14df100' },
            resume: { type: 'string', format: 'binary', description: 'PDF file' },
            applicantImage: { type: 'string', format: 'binary', description: 'PNG image' },
          },
          required: ['name', 'email', 'jobId', 'resume', 'applicantImage'],
        },
      })
      @ApiCreatedResponse({
        description: 'Application submitted successfully',
        schema: {
          example: {
            _id: '6730f0ab4a07cf5ae14df999',
            name: 'Abdullah',
            email: 'AbdullahHaitham@gmail.com',
            jobId: '692737828b2fa163082e938c',
            resume: {
              filename: 'resume.pdf',
              path: 'uploads/resume_12345.pdf',
            },
            applicantImage: {
              filename: 'profile.png',
              path: 'uploads/image_12345.png',
            },
            status: 'pending',
            createdAt: '2025-11-27T20:55:20.553Z',
            updatedAt: '2025-11-27T20:55:20.553Z',
          },
        },
      })
      @ApiBadRequestResponse({
        description: 'Invalid input or missing files or duplicate application attempt',
        schema: {
          example: {
            statusCode: 400,
            message: [
              "Resume is required",
              "Applicant image is required",
              "Resume must be a PDF file",
              "Applicant image must be a PNG file",
              "You have already applied for this job",
              "The job you are applying to does not exist"
            ],
            error: 'Bad Request',
          },
        },
      })
      @ApiUnauthorizedResponse({
        description: 'Unauthorized ',
        schema: {
          example: {
            statusCode: 401,
            message: 'Unauthorized',
            error: 'Unauthorized',
          },
        },
      })
    @UseInterceptors(
    FileFieldsInterceptor([
    { name: 'resume', maxCount: 1 },
    { name: 'applicantImage', maxCount: 1 },
    ]),
    )
    async createApplication(
    @Body() createApplicationDto: CreateApplicationDto,
    @UploadedFiles()
    files: {
        resume?: Express.Multer.File[];
        applicantImage?: Express.Multer.File[];
    },
    ) {
    return this.applicationsService.createApplication(
        createApplicationDto,
        files,
    );
    }

    // Returns all applicants for a specific job.
    // Only the owner of the job is allowed to view this list.
    @Get('job/:jobId')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({  summary: 'Get all applicants for a specific job (Owner only is allowed)',description:
    'How to use this endpoint:\n' +
    '1. Login as a business user who created the job.\n' +
    '2. Copy your access_token from the /auth/login response.\n' +
    '3. Click on the Authorize button in Swagger and paste: Bearer <token>.\n' +
    '4. Enter the jobId of the job you own in the URL path.\n' +
    '5. Execute the request to view all applicants for this job.\n' +
    'Note:\n'+
    '- To test this endpoint you will need to enter the jobId for the job you want to view its applicant list \n'+
    '- Note: you must put the access token in the authorize button provided from swagger and you have to be the job creator to be able to view the applicants.'
  })
    @ApiParam({
        name: 'jobId',
        example: '6730dfc14a07cf5ae14df100',
        description: 'The id of the job whose applicants you want to view',
      })
      @ApiOkResponse({
        description: 'List of applicants for the job',
        schema: {
          example: [
            {
              _id: '6730f5dd4a07cf5ae14dfabc',
              name: 'Abdullah',
              email: 'AbdullahHaitham@gmail.com',
              jobId: '6730dfc14a07cf5ae14df100',
              resume: {
                filename: 'resume.pdf',
                path: 'uploads/resume_1234.pdf',
              },
              applicantImage: {
                filename: 'profile.png',
                path: 'uploads/image_1234.png',
              },
              status: 'pending',
              createdAt: '2025-11-27T21:15:10.553Z',
              updatedAt: '2025-11-27T21:15:10.553Z',
            },
          ],
        },
      })
      @ApiUnauthorizedResponse({
        description: 'Unauthorized — Missing or invalid JWT token',
        schema: {
          example: {
            statusCode: 401,
            message: 'Unauthorized',
            error: 'Unauthorized',
          },
        },
      })
      @ApiForbiddenResponse({
        description: 'Forbidden — Only the job owner can view applicants',
        schema: {
          example: {
            statusCode: 403,
            message: 'You are not allowed to view applicants for this job',
            error: 'Forbidden',
          },
        },
      })
      @ApiNotFoundResponse({ description: 'Job not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Job not found',
            error: 'Not Found',
          },
        },
      })
 @Get('job/:jobId')
 @UseGuards(AuthGuard('jwt'))   
 async getApplicantsForJob(
  @Param('jobId') jobId: string,
  @Req() req:any,
) {
  return this.applicationsService.getApplicantsForJob(
    jobId,
    req.user.userId,   
  );
}

// Allows the job owner to update an applicant’s status.
// Status can only be "accepted" or "rejected".
@Patch(':applicationId/status')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
  @ApiOperation({ summary: 'Update application status (accept or reject)', description:'How to use this endpoint:\n' +
  '1. Login as the owner of the job** related to this application.\n' +
  '2. Copy your access_token from /auth/login.\n' +
  '3. Click the Authorize button in Swagger and paste: your access token.\n' +
  '4. Provide the applicationId in the URL path.\n' +
  '5. In the request body, set status to either accepted or rejected\n' +
  'Note:\n' +
  '- To change applicant status you must be the creator of the job and make sure that you entered the access token.'
})
  @ApiParam({
    name: 'applicationId',
    example: '6730f8a44a07cf5ae14dfb99',
    description: 'The id of the application to update',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['accepted', 'rejected'],
          example: 'accepted',
        },
      },
      required: ['status'],
    },
  })
  @ApiOkResponse({
    description: 'Application status updated successfully',
    schema: {
      example: {
        _id: '6730f8a44a07cf5ae14dfb99',
        name: 'Abdullah',
        email: 'AbdullahHaitham@gmail.com',
        jobId: '6730dfc14a07cf5ae14df100',
        resume: {
          filename: 'resume.pdf',
          path: 'uploads/resume_1234.pdf',
        },
        applicantImage: {
          filename: 'profile.png',
          path: 'uploads/image_1234.png',
        },
        status: 'accepted',
        createdAt: '2025-11-27T21:45:52.553Z',
        updatedAt: '2025-11-27T22:01:10.553Z',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized — Missing or invalid JWT token',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
        error: 'Unauthorized',
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden — Only the job owner can update this application',
    schema: {
      example: {
        statusCode: 403,
        message: 'You are not allowed to update applications for this job',
        error: 'Forbidden',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Application or Job not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Application not found',
        error: 'Not Found',
      },
    },
  })
async updateApplicationStatus(
  @Param('applicationId') applicationId: string,
  @Body() updateStatusDto: UpdateStatusDto,
  @Req() req: any,
) {
  return this.applicationsService.updateApplicationStatus(
    applicationId,
    updateStatusDto.status,
    req.user.userId,
  );
}
}
