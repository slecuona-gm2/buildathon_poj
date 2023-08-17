import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { InfoRequest, InfoRequestSchema } from './schemas/info-request.schema';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_URI),
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: InfoRequest.name, schema: InfoRequestSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
