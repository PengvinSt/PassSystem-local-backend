import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UtilityService } from "src/services/utility.service";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer, diskStorage } from "multer";
import { extname } from "path";
const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;

@Controller()
export class UtilityController {
  constructor(private readonly utilityService: UtilityService) {}

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./src/assets",
        filename: (req, file, cb) => {
          const randomName = Array(16)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  public async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: "image/jpeg" })
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })
    )
    file: Express.Multer.File
  ) {
    const data = {
      statusCode: 200,
      data: "http://localhost:3001/" + file.path.split("\\")[2],
    };
    return data;
  }
}
