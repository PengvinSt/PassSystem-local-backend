import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, UserSchema } from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import { UserResolver } from "../resolver/user.resolver";
import { PassportModule } from "@nestjs/passport";

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
  ],
  providers: [UserService, UserResolver],
  exports: [UserService, UserResolver], // Export UsersService to use it out of the module
})
export class UserModule {}
