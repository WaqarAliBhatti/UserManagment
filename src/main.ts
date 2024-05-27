import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT=process.env.PORT
  const config = new DocumentBuilder()
  .setTitle('My Practice App')
  .setDescription('The API description')
  .setVersion('1.0')
  .addBearerAuth() // Add Bearer Authentication configuration
  .build();
  // set up password for accessing docs
  // app.use(
    // //Paths you want to protect with basic auth
  //   '/docs*',
  //   basicAuth({
  //     challenge: true,
  //     users: {
  //       developer: 'Developer@123',
  //     },
  //   }),
  // );
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
  await app.listen(PORT||3002);
  Logger.log(`App listening on port ${PORT}`);

}
bootstrap();
