import 'dotenv/config';

import * as redisStore from 'cache-manager-redis-store';
import { GraphQLError } from 'graphql';

import {
    CacheInterceptor, CacheModule, ClassSerializerInterceptor, Logger, MiddlewareConsumer, Module,
    Provider
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
    AttributeModule, AuthModule, CartModule, CategoryModule, ConfigModule, ConfigService,
    DepartmentModule, HelperModule, OrderModule, ProductModule, ShippingModule, StripeModule,
    TaxModule, UserModule
} from './app';
import { AppController } from './app.controller';
import { CorsMiddleware } from './middlewares/cors.middleware';

const imports = [
  TypeOrmModule.forRootAsync({
    useFactory: async (configService: ConfigService) => ({
      type: configService.get('TYPEORM_CONNECTION') as any,
      host: configService.get('TYPEORM_HOST'),
      port: configService.get('TYPEORM_PORT') as any,
      username: configService.get('TYPEORM_USERNAME'),
      password: configService.get('TYPEORM_PASSWORD'),
      database: configService.get('TYPEORM_DATABASE'),
      entities: [configService.get('TYPEORM_ENTITIES')],
      synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
      logging: configService.get('TYPEORM_LOGGING') === 'true',
    }),
    inject: [ConfigService],
  }),
  ConfigModule,
  UserModule,
  AttributeModule,
  CartModule,
  CategoryModule,
  DepartmentModule,
  OrderModule,
  ShippingModule,
  TaxModule,
  ProductModule,
  AuthModule,
  StripeModule,
  HelperModule,
];

const providers: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
];

if (process.env.CACHE_ENABLED) {
  imports.push(
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('CACHE_HOST'),
        port: configService.get('CACHE_PORT'),
        password: configService.get('CACHE_PASSWORD'),
        ttl: configService.get('CACHE_TTL'),
      }),
      inject: [ConfigService],
    }));

  providers.push(
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
  );
}

if (process.env.GRAPHQL_ENABLED === 'true') {
  imports.push(
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        typePaths: [configService.get('GRAPHQL_SCHEMA')],
        context: ({ req }) => ({ req }),
        debug: false,
        introspection: configService.get('GRAPHQL_EDITOR') === 'true',
        playground: configService.get('GRAPHQL_EDITOR') === 'true',
        formatError: (error: GraphQLError) => {
          Logger.error(
            JSON.stringify({
              message: error.message,
              location: error.locations,
              stack: error.stack ? error.stack.split('\n') : [],
              path: error.path,
            })
          );
          return error;
        },
      }),
      inject: [ConfigService],
    })
  );
}

@Module({
  imports,
  providers,
  controllers: [
    AppController,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
