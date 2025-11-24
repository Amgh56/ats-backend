import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI as string, {
    connectionFactory: (connection) => {
      console.log("MongoDB Connected Successfully:", connection.name);
      return connection;
    },
   })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
