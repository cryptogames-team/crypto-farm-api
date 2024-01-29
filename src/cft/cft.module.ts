import { Module } from '@nestjs/common';
import { CftController } from './cft.controller';
import { CftService } from './cft.service';
import { TypeOrmExModule } from 'src/core/typeorm-ex.module';
import { CFTAuctionRepository } from './repositories/cft.repository';
import { CFTHistoryRepository } from './repositories/cft_history.repository';
import { UserRepository } from 'src/user/repositories/user.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CFTAuctionRepository,CFTHistoryRepository,UserRepository]),
  ],
  controllers: [CftController],
  providers: [CftService]
})
export class CftModule {}
