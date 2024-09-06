import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { StationsModule } from './stations/stations.module';
import { AuthModule } from './auth/auth.module';
import { LiabilityTypeModule } from './liability-type/liability-type.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { CounterTypeModule } from './counter-type/counter-type.module';
import { DispenserTypeModule } from './dispenser-type/dispenser-type.module';
import { TpetypeModule } from './tpetype/tpetype.module';
import { CurrencyModule } from './currency/currency.module';
import { FuelModule } from './fuel/fuel.module';
import { FuelRateModule } from './fuel-rate/fuel-rate.module';
import { TankModule } from './tank/tank.module';
import { SectionModule } from './section/section.module';
import { DispenserModule } from './dispenser/dispenser.module';
import { PistolModule } from './pistol/pistol.module';
import { UserAccountModule } from './user-account/user-account.module';
import { PaginationModule } from './common/pagination/pagination.module';
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
    LiabilityTypeModule,
    PaymentMethodModule,
    CounterTypeModule,
    DispenserTypeModule,
    TpetypeModule,
    CurrencyModule,
    FuelModule,
    FuelRateModule,
    TankModule,
    SectionModule,
    DispenserModule,
    PistolModule,
    UserAccountModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
