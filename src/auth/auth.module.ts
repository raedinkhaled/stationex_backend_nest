import {
  DynamicModule,
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModuleConfig, ConfigInjectionToken } from './config.interface';
import { AuthMiddleware } from './auth.middleware';
import { SupertokensService } from './supertokens/supertokens.service';
import { UserAccountModule } from 'src/user-account/user-account.module';

@Module({
  controllers: [AuthController],
  providers: [],
  imports: [forwardRef(() => UsersModule), UserAccountModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot({
    connectionURI,
    apiKey,
    appInfo,
  }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
        SupertokensService,
      ],
      exports: [],
      imports: [],
      module: AuthModule,
    };
  }
}
