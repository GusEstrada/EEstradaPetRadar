import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as appInsights from 'applicationinsights';
import { envs } from './config/envs'; // Asegúrate de que esta ruta sea correcta

async function bootstrap() {
  // Cambia APPINSIGHTS_CONNECTION_STRING por AZURE_INSIGHTS_CONNECTION_STRING
  if (envs.AZURE_INSIGHTS_CONNECTION_STRING) {
    appInsights.setup(envs.AZURE_INSIGHTS_CONNECTION_STRING)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true, true)
      .setAutoCollectExceptions(true)
      .start();
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`🚀 Server running on http://localhost:3000`);
}
bootstrap();