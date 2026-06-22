import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import * as appInsights from 'applicationinsights';

import { FoundPetsModule } from './found-pets/found-pets.module';
import { LostPetsModule } from './lost-pets/lost-pets.module';
import { EmailModule } from './email/email.module';

import { envs } from './config/envs';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: envs.REDIS_HOST,
            port: envs.REDIS_PORT,
          },
          ttl: 60000,
        }),
      }),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      username: envs.DB_USER,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    FoundPetsModule,
    LostPetsModule,
    EmailModule,
  ],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    if (envs.AZURE_INSIGHTS_CONNECTION_STRING) {
      appInsights
        .setup(envs.AZURE_INSIGHTS_CONNECTION_STRING)
        .setAutoDependencyCorrelation(true)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true, true)
        .setAutoCollectExceptions(true)
        .start();
      console.log('Azure Application Insights iniciado en PetRadar');
    }
  }
}
