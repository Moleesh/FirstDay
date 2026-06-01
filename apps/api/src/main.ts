/**
 * @format
 * @module ApiMain
 * @description Bootstraps the NestJS API with Fastify, security, and Swagger.
 * @author auto
 * @since 1.0.0
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from '@/app.module';

/**
 * Starts the API server.
 * @returns A promise that resolves once the server is listening.
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    app.use(helmet());
    app.enableCors({ origin: process.env.WEB_ORIGIN, credentials: true });
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    const config = new DocumentBuilder().setTitle('FirstDay API').setVersion('1.0.0').build();
    SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));
    await app.listen(Number(process.env.PORT ?? 4000), '0.0.0.0');
}

void bootstrap();
