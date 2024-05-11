import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '../config/db-connect.config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Allow to use env globaly
      envFilePath: 'envs/.backend.env', //path to env
    }),
    MongooseModule.forRootAsync({
      //Mongoose connection module
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig, // config function
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // Provides graphql driver
      driver: ApolloDriver,
      autoSchemaFile: true,
      //playground: false,
    }),
    AuthModule,
  ],
})
export class AppModule {}
