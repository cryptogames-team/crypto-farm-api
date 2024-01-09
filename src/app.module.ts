import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { typeORMconfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ItemModule } from './item/item.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MapModule } from './map/map.module';
import { AuctionModule } from './auction/auction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true
  }),
  // MongooseModule.forRoot('mongodb://221.148.25.234/nest'),
    UserModule,
    ItemModule,
    AuctionModule,
    // MapModule
  ],
})
export class AppModule {}
