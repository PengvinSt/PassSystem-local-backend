import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, UserSchema } from "../schemas/user.schema";
import { VerifyController } from "../controllers/verify.controller";
import { VerifyService } from "../services/verify.service";
import { PassportModule } from "@nestjs/passport";
import { MulterModule } from "@nestjs/platform-express";
@Module({
  imports: [
    MongooseModule.forFeature([
      // Import MongooseModule
      {
        name: UserModel.name, // Set name of model in database
        schema: UserSchema, // Set schema of model
      },
    ]),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    MulterModule.register({
      dest: "./assets",
    }),
  ],
  controllers: [VerifyController],
  providers: [VerifyService],
  exports: [VerifyService],
})
export class VerifyModule {}
