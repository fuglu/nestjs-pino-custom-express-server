import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as express from 'express';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

// This one works
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}

// This one has only request logs
async function bootstrapCreateServer() {
  const server = express();

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
    {
      bufferLogs: true,
    },
  );
  app.useLogger(app.get(Logger));

  await app.init();

  server.listen(3000);
}

// bootstrap();
bootstrapCreateServer();
