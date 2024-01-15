import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmExModule } from '../core/typeorm-ex.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ItemRepository } from 'src/item/repositories/item.repository';
import { OwnItemRepository } from 'src/item/repositories/own_item.repository';
@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_SCRET_KEY,
      signOptions : {
        expiresIn: 60 * 60,
      }
    }),
    TypeOrmExModule.forCustomRepository([ItemRepository,OwnItemRepository,UserRepository])
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy,PassportModule]
})
export class UserModule {}
