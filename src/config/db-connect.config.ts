import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";

const getMongoString = (configService: ConfigService) =>
  "mongodb://" +
  configService.get("DB_LOGIN") +
  ":" +
  configService.get("DB_PASSWORD") +
  "@" +
  configService.get("DB_HOST") +
  ":" +
  configService.get("DB_PORT") +
  "/" +
  configService.get("DB_AUTHDATABASE");

const getMongoOptions = () => ({
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
});

export const getMongoConfig = async (
  configService: ConfigService
): Promise<MongooseModuleOptions> => {
  console.log(getMongoString(configService));
  return {
    uri: `mongodb+srv://PengvinSt:1234@testweb.p8jeqwk.mongodb.net/?retryWrites=true&w=majority`,
    ...getMongoOptions(),
  };
};
