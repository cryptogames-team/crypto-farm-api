import { Module } from '@nestjs/common';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import { TypeOrmExModule } from 'src/core/typeorm-ex.module';
import { AuctionRepository } from './repositories/auction.repository';
import { PurchaseRepository } from './repositories/purchase.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserModule } from 'src/user/user.module';
import { ItemModule } from 'src/item/item.module';
import { OwnItemRepository } from 'src/item/repositories/own_item.repository';
import { ItemRepository } from 'src/item/repositories/item.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([AuctionRepository, PurchaseRepository,
       UserRepository, OwnItemRepository,ItemRepository]),
    UserModule,
    ItemModule
  ],
  controllers: [AuctionController],
  providers: [AuctionService]
})
export class AuctionModule {}
