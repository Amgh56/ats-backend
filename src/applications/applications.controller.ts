import { Controller,Post,Body,UploadedFiles,UseInterceptors,} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateApplicationDto } from './dto/applications.dto';
@Controller('applications')
export class ApplicationsController {}
