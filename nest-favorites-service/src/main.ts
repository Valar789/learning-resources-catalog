import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:1337'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Favorites API')
    .setDescription('API for managing favorite learning resources')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  //Global
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3001);
}
bootstrap();
