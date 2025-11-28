import { Injectable, BadRequestException, ForbiddenException,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application, ApplicationDocument } from './schemas/applications.schema';
import { CreateApplicationDto } from './dto/applications.dto';
import { Jobs, JobsDocument } from '../jobs/schemas/job.schema';

// This service handles everything related to job applications.
@Injectable()
export class ApplicationsService {
    constructor(@InjectModel(Application.name)
        private applicationModel: Model<ApplicationDocument>,
        @InjectModel(Jobs.name)
        private jobModel: Model<JobsDocument>,
      )  {}
        
      // This function handles applicant applying to a job logic 
      // checks if the files are uploaded or not, validates if the job exsists, prevent duplicate application for the same job. 
      async createApplication(dto:CreateApplicationDto,files:{resume?: Express.Multer.File[],
        applicantImage?:Express.Multer.File[]}){
        if(!files.resume || !files.resume[0]){
            throw new BadRequestException("Resume is required");
        }
        if(!files.applicantImage || !files.applicantImage[0]){
            throw new BadRequestException("Applicant image is required");
        }
        
        if (files.resume[0].mimetype !== 'application/pdf') {
            throw new BadRequestException('Resume must be a PDF file');
          }
        
          if (files.applicantImage[0].mimetype !== 'image/png') {
            throw new BadRequestException('Applicant image must be a PNG file');
          }


        const{name, email, jobId} =  dto;

        const job = await this.jobModel.findById(jobId);
        if(!job){
            throw new BadRequestException("'The job you are applying to does not exist'");
        }

        const existing = await this.applicationModel.findOne({ email, jobId });
         if (existing) {
        throw new BadRequestException('You have already applied for this job you are not allowed to apply twice' );
        }

        const applicationData ={
            name,email,jobId,resume :{filename: files.resume[0].filename, path:files.resume[0].path},
             applicantImage: {filename: files.applicantImage[0].filename, path: files.applicantImage[0].path},
        };

        const created = new this.applicationModel(applicationData);
        return created.save();

      }

      // Returns all applicants who applied to a specific job.
      // Only the job owner is allowed to view this list.
      async getApplicantsForJob(jobId: string, requesterId: string) {
        const job = await this.jobModel.findById(jobId);
        if (!job) {
          throw new NotFoundException('Job not found');
        }
      
        if (job.ownerId !== requesterId) {
          throw new ForbiddenException('You are not allowed to view applicants for this job');
        }
         return this.applicationModel.find({ jobId });
      }
      
      // Updates the status of an application (accepted or rejected).
      // Only the job owner can decide. 
      async updateApplicationStatus( applicationId: string,  newStatus: 'accepted' | 'rejected',
        requesterId: string,
      ) {
        const application = await this.applicationModel.findById(applicationId);
        if (!application) {
          throw new NotFoundException('Application not found');
        }
      
        const job = await this.jobModel.findById(application.jobId);
        if (!job) {
          throw new NotFoundException('Job not found');
        }
      
        if (job.ownerId.toString() !== requesterId) {
          throw new ForbiddenException('You are not allowed to update applications for this job',);
        }
      
        application.status = newStatus;
        return application.save();
      }
      
}
