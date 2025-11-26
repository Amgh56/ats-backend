import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI as string, {
    connectionFactory: (connection) => {
      console.log("MongoDB Connected Successfully:", connection.name);
      return connection;
    },
   }), UsersModule, AuthModule, JobsModule, ApplicationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
