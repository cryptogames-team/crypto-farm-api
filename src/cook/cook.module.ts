import { Module } from '@nestjs/common';
import { CookController } from './cook.controller';
import { CookService } from './cook.service';
import { TypeOrmExModule } from 'src/core/typeorm-ex.module';
import { OwnItemRepository } from 'src/item/repositories/own_item.repository';
import { ItemRepository } from 'src/item/repositories/item.repository';
import { UserRepository } from 'src/user/repositories/user.repository';

@Module({
  imports : [
    TypeOrmExModule.forCustomRepository([OwnItemRepository, ItemRepository, UserRepository]),
  ],
  controllers: [CookController],
  providers: [CookService]
})
export class CookModule {}
