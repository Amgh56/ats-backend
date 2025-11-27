import { Controller,Post,Body,UploadedFiles,UseInterceptors,UseGuards,Get,Param,Req,Patch} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateApplicationDto } from './dto/applications.dto';
import {ApplicationsService} from './applications.service'
import { AuthGuard } from '@nestjs/passport';
import { UpdateStatusDto } from './dto/updateStatus.dto';
@Controller('applications')
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService){}

    @Post()
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

@Patch(':applicationId/status')
@UseGuards(AuthGuard('jwt'))
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
