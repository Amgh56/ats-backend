import { Controller } from '@nestjs/common';
import { ApiTags, ApiExtraModels } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
@ApiTags('Users')
@ApiExtraModels(User)
@Controller('users')
export class UsersController {}
