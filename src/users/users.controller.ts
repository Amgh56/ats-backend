import { Controller } from '@nestjs/common';
import { ApiTags, ApiExtraModels } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
@ApiTags('Users')
@ApiExtraModels(User) // added this to allow the schema to show in swagger.ui 
@Controller('users')
export class UsersController {}
