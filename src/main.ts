import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./modules/main.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
async function Start() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, "assets"));
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  const port = process.env.PORT || 3001;
  // app.use(express.static(join(__dirname, '../assets')));
  //Swagger setup
  const config = new DocumentBuilder()
    .setTitle("Pass server API")
    .setDescription("The pass server API description")
    .setVersion("0.0.1")
    .addBearerAuth({
      // I was also testing it without prefix 'Bearer ' before the JWT
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: "Authorization",
      bearerFormat: "Bearer", // I`ve tested not to use this field, but the result was the same
      scheme: "Bearer",
      type: "http", // I`ve attempted type: 'apiKey' too
      in: "Header",
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document);
  //app.useGlobalPipes(new ValidationPipe())
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

Start();
