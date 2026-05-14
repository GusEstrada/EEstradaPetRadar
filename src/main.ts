import 'dotenv/config';
import * as appInsights from 'applicationinsights';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs'; 

async function bootstrap() {
  if (envs.APPINSIGHTS_CONNECTION_STRING) {
    appInsights
      .setup(envs.APPINSIGHTS_CONNECTION_STRING)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true, true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true)
      .setUseDiskRetryCaching(true)
      .start();
    console.log(' Azure Application Insights iniciado correctamente');
  } else {
    console.warn(' Advertencia: APPINSIGHTS_CONNECTION_STRING no encontrada en el .env');
  }

  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  await app.listen(3000);
  console.log(' Server running on http://localhost:3000');
}
bootstrap();