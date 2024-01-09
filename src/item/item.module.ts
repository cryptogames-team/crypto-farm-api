import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmExModule } from 'src/core/typeorm-ex.module';
import { OwnItemRepository } from './repositories/own_item.repository';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/repositories/user.repository';
import { ItemRepository } from './repositories/item.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([OwnItemRepository, ItemRepository, UserRepository]),
    UserModule
  ],
  controllers: [ItemController],
  providers: [ItemService]
})
export class ItemModule {}
