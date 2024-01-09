import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Purchase } from "../entities/purchase.entity";

@CustomRepository(Purchase)
export class PurchaseRepository extends Repository<Purchase>{

}