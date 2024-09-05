import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { StationsModule } from './stations/stations.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule.forRoot({
      // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: 'http://localhost:3567',
      apiKey: 'Bkjsv3sunsso1n8=-dickjissj3ncisds',
      // apiKey: <API_KEY(if configured)>,
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
        appName: 'Stationex',
        apiDomain: 'http://localhost:3000',
        websiteDomain: 'http://localhost:4000',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [User],
        synchronize: true,
        port: 5432,
        username: 'postgres',
        password: 'admin',
        host: 'localhost',
        database: 'stationex-backend',
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    CompaniesModule,
    StationsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
