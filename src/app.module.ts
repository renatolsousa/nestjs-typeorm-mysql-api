import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    /**
     * Ref:https://docs.nestjs.com/techniques/configuration
     */
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    /**
     * Ref: https://docs.nestjs.com/techniques/database#async-configuration
     * Ref: https://docs.nestjs.com/recipes/sql-typeorm
     */
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('database.synchronize') || true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
