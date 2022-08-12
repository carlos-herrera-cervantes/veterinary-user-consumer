import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.EMPLOYEE_DB, {
      connectionName: 'employees',
    }),
    MongooseModule.forRoot(process.env.CUSTOMER_DB, {
      connectionName: 'customers',
    }),
    UserModule,
  ],
})
export class AppModule {}
