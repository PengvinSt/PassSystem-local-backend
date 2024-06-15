import { Module } from "@nestjs/common";
import { UtilityController } from "../controllers/utility.controller";

import { PassportModule } from "@nestjs/passport";
import { UtilityService } from "src/services/utility.service";

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
  ],
  controllers: [UtilityController],
  providers: [UtilityService],
  exports: [UtilityService],
})
export class UtilityModule {}
